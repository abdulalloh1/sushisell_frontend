<script
    lang="ts"
    setup
>
import type { Login } from "@/types/auth";
import { computed, onMounted, reactive, ref } from 'vue';
import { useAuthStore } from "@/store/parts/auth";

import AppInput from '@/components/UI/AppInput/AppInput.vue';
import AppInputPhone from "@/components/UI/AppInputPhone/AppInputPhone.vue";
import { useRouter } from "vue-router";
import ProgressLinear from "@/components/UI/ProgressLinear/ProgressLinear.vue";
import { useCitiesStore } from "@/store/parts/cities";
import api from "@/api";
import useToast from "@/components/UI/AppToast/useToast";

const router = useRouter()
const { toast } = useToast()
const authStore = useAuthStore()
const citiesStore = useCitiesStore()
const loginCredentials: Login = reactive({
  phone: '',
  password: ''
})
const captchaImage = ref('')
const captchaValue = ref('')
const hasExternalID = ref(!!citiesStore.activeCity.external_id)
const isCaptchaLoading = ref(false)
const isRequestPending = ref(false)

const computedSubmitBtnDisabled = computed(() => {
  return !loginCredentials.phone.trim() || hasExternalID.value ? !loginCredentials.password.trim() : isCaptchaLoading.value
})

async function login () {
  isRequestPending.value = true
  if(!hasExternalID.value) {
    delete loginCredentials.password
    loginCredentials.code = captchaValue.value

    const {data} = await api.auth.authExternal(loginCredentials)
    if(data?.data?.errors) {
      Object.keys(data.data.errors).forEach(key => {
        let errorMessage;
        if(key === 'code') {
          errorMessage = data.data.errors.code[0];
        } else {
          errorMessage = key;
        }
        toast.error(errorMessage);
      })
    }
  } else {
    await authStore.login(loginCredentials)
        .then(() => {
          router.push({name: 'Profile'})
        })
  }

  isRequestPending.value = false
}

async function getCaptcha () {
  isCaptchaLoading.value = true
  const {data} = await api.auth.getCaptchaApi()
  if(data.success) {
    captchaImage.value = data.data.image
  }

  isCaptchaLoading.value = false
}

onMounted(() => {
  if(!hasExternalID.value) getCaptcha()
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
        {{ citiesStore.activeCity.external_id ? 'Вход' : 'Вход / регистрация' }}
      </h3>
      <div
          v-if="!citiesStore.activeCity.external_id"
          class="auth__captcha"
      >
        <button
            :class="['auth__captcha__refresh-btn', {
                'auth__captcha__refresh-btn--loading': isCaptchaLoading
            }]"
            @click.prevent=""
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
          v-if="citiesStore.activeCity.external_id"
          v-model="loginCredentials.password"
          type="password"
          placeholder="Пароль"
          :width="270"
      />
      <div
          v-if="!citiesStore.activeCity.external_id"
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
        {{ citiesStore.activeCity.external_id ? 'Войти' : 'Позвонить мне' }}
      </button>
    </form>
    <div
        v-if="citiesStore.activeCity.external_id"
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
  </div>
</template>