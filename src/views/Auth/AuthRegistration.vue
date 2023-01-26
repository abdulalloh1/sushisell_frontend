<script lang="ts" setup>
// Components
import AppInput from "@/components/UI/AppInput/AppInput.vue";
import AppInputPhone from "@/components/UI/AppInputPhone/AppInputPhone.vue";

import type { Register } from "@/types/auth";
import { computed, onMounted, reactive, ref } from "vue";
import api from "@/api";
import useToast from "@/components/UI/AppToast/useToast";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/parts/auth";
import AuthPhoneConfirmationModal from "@/components/WorkSpace/PhoneConfirmationModal/PhoneConfirmationModal.vue";
import { InternalAccessToken } from "@/cache/AccessToken";

const { toast } = useToast()
const router = useRouter()
const authStore = useAuthStore()
const registerFields: Register = reactive({
  phone: '',
  password: '',
  password_repeat: '',
  verify_type: ''
})
const registerTypes = ref([])
const isConfirmModalOpen = ref(false)
const isRegisterCheckPending = ref(false)

const computedIsButtonDisabled = computed(() => {
  return !registerFields.phone ||
      !registerFields.password ||
      !registerFields.password_repeat ||
      !registerFields.verify_type
})

function fieldsValidation () {
  if(registerFields.password !== registerFields.password_repeat) {
    toast.error('Пароли не совпадают')
  }
  if(registerFields.phone.length < 10) {
    toast.error('Некорректный формат номера телефона')
  }

  else return true
}

async function getAvailableRegisterTypes () {
  const {data} = await api.auth.getAvailableRegisterTypesApi()
  registerTypes.value = data.types
}

function selectRegisterType (value: string) {
  registerFields.verify_type = value
}

async function submit () {
  if(!fieldsValidation()) return

  const {data} = await api.auth.registerApi(registerFields)

  if(data.success) {
    isConfirmModalOpen.value = true
  }
  else {
    toast.error(data.error_message)
  }
}

async function registerCheck (code: string) {
  const {data} = await api.auth.registerCheckApi({
    phone: registerFields.phone,
    code
  })

  if(data.success) {
    authStore.isLoggedIn = true
    InternalAccessToken.set(data.token)
    await router.push({name: 'Profile'})
  }
  else {
    toast.error(data.error_message)
  }
}

onMounted(() => {
  getAvailableRegisterTypes()
})

</script>
<template>
  <div class="auth">
    <form
        class="auth__input-wrapper register"
        @submit.prevent
    >
      <h3 class="auth__title">
        регистрация
      </h3>
      <div class="auth__inputs">
        <app-input-phone v-model="registerFields.phone"/>
        <app-input
            v-model="registerFields.password"
            type="password"
            placeholder="Пароль"
        />
        <app-input
            v-model="registerFields.password_repeat"
            type="password"
            placeholder="Повторить Пароль"
        />
      </div>
      <p class="auth__text">Куда отправить код для входа?</p>
      <div
          v-if="registerTypes.length > 1"
          class="auth__infos"
      >
        <button
            v-if="registerTypes.includes('telegram')"
            :class="['auth__contact', {
              'auth__contact--active': registerFields.verify_type === 'telegram'
            }]"
            @click="selectRegisterType('telegram')"
        >
          <svg data-src="/img/icons/telegram.svg"/>
          Telegram
        </button>
        <button
            v-if="registerTypes.includes('call')"
            :class="['auth__contact', {
              'auth__contact--active': registerFields.verify_type === 'call'
            }]"
            @click="selectRegisterType('call')"
        >
          <svg
              data-v-6fdda0ab=""
              data-v-4561fb79=""
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="external-confirm__button-svg"
          >
            <path
                data-v-6fdda0ab=""
                data-v-4561fb79=""
                d="M1.20871 0L4.12001 0.105352C4.73321 0.127536 5.2774 0.514767 5.51241 1.09616L6.37323 3.2257C6.57359 3.72126 6.51967 4.28669 6.22953 4.73306L5.12664 6.42999C5.77962 7.36767 7.55574 9.56462 9.43638 10.8506L10.8387 9.98758C11.1951 9.76822 11.6218 9.7031 12.0251 9.80646L14.8128 10.5213C15.5543 10.7115 16.0539 11.4225 15.9953 12.2041L15.8164 14.5908C15.7535 15.4283 15.068 16.0855 14.2544 15.9909C3.51395 14.7421 -2.78445 -2.39999e-05 1.20871 0Z"
                fill="#140E38"
            />
          </svg>
          Звонок
        </button>
      </div>
      <a
          href="#"
          class="auth__accord"
      >Нажимая «Подтвердить»
        вы соглашаетесь с <span>условиями обработки персональных данных</span>
      </a>
      <button
          type="submit"
          class="auth__btn confirm"
          :disabled="computedIsButtonDisabled"
          @click.prevent="submit"
      >
        Подтвердить
      </button>
    </form>
    <div class="auth__links">
      <router-link
          :to="{name: 'Login'}"
          class="auth__link"
      >
        Авторизация
      </router-link>
    </div>

    <auth-phone-confirmation-modal
        v-model="isConfirmModalOpen"
        title="Введите Проверочный код из голосового сообщения"
        :loading="isRegisterCheckPending"
        @submit="registerCheck"
    />
  </div>
</template>