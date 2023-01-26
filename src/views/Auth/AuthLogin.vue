<script
    lang="ts"
    setup
>
import type { externalLogin, internalLogin } from "@/types/auth";
import { computed, onMounted, reactive, ref } from 'vue';
import { useAuthStore } from "@/store/parts/auth";

import AppInput from '@/components/UI/AppInput/AppInput.vue';
import AppInputPhone from "@/components/UI/AppInputPhone/AppInputPhone.vue";
import { useRouter } from "vue-router";
import ProgressLinear from "@/components/UI/ProgressLinear/ProgressLinear.vue";
import { useCitiesStore } from "@/store/parts/cities";
import api from "@/api";
import useToast from "@/components/UI/AppToast/useToast";
import { useMenuStore } from "@/store/parts/menu";
import AuthPhoneConfirmationModal from "@/components/WorkSpace/PhoneConfirmationModal/PhoneConfirmationModal.vue";
import DeviceUuidCache from "@/cache/DeviceUuidCache";

const router = useRouter()
const { toast } = useToast()
const authStore = useAuthStore()
const citiesStore = useCitiesStore()
const menuStore = useMenuStore()
const loginCredentials = reactive({
  phone: '',
  password: '',
  code: ''
})
const captchaImage = ref('')
const captchaValue = ref('')
const isCaptchaLoading = ref(false)
const isRequestPending = ref(false)
const isConfirmModalOpen = ref(false)

if (authStore.isLoggedIn) router.push({ name: 'Profile' })

const computedSubmitBtnDisabled = computed(() => {
  return !loginCredentials.phone.trim() || citiesStore.hasActiveCityExternalId ? !loginCredentials.password.trim() : isCaptchaLoading.value
})

async function login() {
  isRequestPending.value = true
  if (!citiesStore.hasActiveCityExternalId) {
    await internalLogin()
  } else {
    await externalLogin()
  }

  isRequestPending.value = false
}

async function internalLogin() {
  const internalLoginCredentials: internalLogin = {
    code: captchaValue.value,
    phone: '7' + loginCredentials.phone
  }
  const { data } = await api.auth.authExternal(internalLoginCredentials)

  if (checkErrorFromData(data)) {
    await getCaptcha()
  } else {
    isConfirmModalOpen.value = true
  }
}

async function externalLogin() {
  return await authStore.login(loginCredentials)
      .then(() => {
        router.push({ name: 'Profile' })
        menuStore.getFavoriteProducts()
      })
}

function checkErrorFromData(data: object) {
  if (!data?.data?.errors) return false;

  Object.keys(data.data.errors).forEach(key => {
    let errorMessage;
    if (key === 'code') {
      errorMessage = data.data.errors.code[0];
    } else {
      errorMessage = key;
    }
    toast.error(errorMessage);
  })

  return true
}

async function confirmPhoneNumber(code: string) {
  const confirmDTO = {
    phone: loginCredentials.phone,
    code,
    guid: DeviceUuidCache.get(),
    os_type: "Web"
  }
  const { data } = await api.auth.authExternalConfirm(confirmDTO)

  checkErrorFromData(data)
  isConfirmModalOpen.value = false
}

async function getCaptcha () {
  isCaptchaLoading.value = true
  const {data} = await api.auth.getCaptchaApi()
  if(data.success) {
    captchaImage.value = data.data.image
  }

  isCaptchaLoading.value = false
}

function resendCaptcha () {
  isConfirmModalOpen.value = false
  getCaptcha()
}

onMounted(() => {
  if (!citiesStore.hasActiveCityExternalId) getCaptcha()
})


</script>

<template>
  <div class="auth">
    <progress-linear v-if="isRequestPending"/>
    <form
        class="auth__input-wrapper"
        @submit.prevent="login"
    >
      <h3 class="auth__title">
        {{ citiesStore.hasActiveCityExternalId ? 'Вход' : 'Вход / регистрация' }}
      </h3>
      <div
          v-if="!citiesStore.hasActiveCityExternalId"
          class="auth__captcha"
      >
        <button
            :class="['auth__captcha__refresh-btn', {
                'auth__captcha__refresh-btn--loading': isCaptchaLoading
            }]"
            :disabled="isCaptchaLoading"
            @click.prevent="getCaptcha"
        >
          <svg data-src="/img/icons/refresh.svg"/>
        </button>
        <img
            :src="captchaImage"
            alt=""
            class="auth__captcha__image"
        >
        <app-input
            v-model="captchaValue"
            placeholder="Введите капчу"
        />
      </div>
      <app-input-phone
          v-model="loginCredentials.phone"
      />
      <app-input
          v-if="citiesStore.hasActiveCityExternalId"
          v-model="loginCredentials.password"
          type="password"
          placeholder="Пароль"
          :width="270"
      />
      <div
          v-if="!citiesStore.hasActiveCityExternalId"
          class="auth__description"
      >
        После нажатия на кнопку вам поступит звонок.
        <br>
        Отвечать на звонок не нужно.
      </div>
      <button
          type="submit"
          class="auth__btn"
          :disabled="computedSubmitBtnDisabled"
      >
        {{ citiesStore.hasActiveCityExternalId ? 'Войти' : 'Позвонить мне' }}
      </button>
    </form>
    <div
        v-if="citiesStore.hasActiveCityExternalId"
        class="auth__links"
    >
      <router-link
          :to="{name: 'Registration'}"
          class="auth__link"
      >
        Регистрация
      </router-link>
      <button class="auth__link">Забыли пароль?</button>
    </div>

    <auth-phone-confirmation-modal
        v-model="isConfirmModalOpen"
        @submit="confirmPhoneNumber"
    >
      <p class="confirm-phone-modal-dialog__subtitle">Не получается войти?</p>
      <button
        class="confirm-phone-modal-dialog__btn"
        @click="resendCaptcha"
      >
        Отправить СМС код
      </button>
    </auth-phone-confirmation-modal>
  </div>
</template>