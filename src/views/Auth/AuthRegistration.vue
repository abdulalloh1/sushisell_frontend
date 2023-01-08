<script lang="ts" setup>
// Components
import AppInput from "@/components/UI/AppInput/AppInput.vue";
import AppInputPhone from "@/components/UI/AppInputPhone/AppInputPhone.vue";

import type { Register } from "@/types/auth";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { vMaska } from 'maska';
import useToast from "@/components/UI/AppToast/useToast";
import api from "@/api";
import ModalDialog from "@/components/UI/ModalDialog/ModalDialog.vue";
import ProgressLinear from "@/components/UI/ProgressLinear/ProgressLinear.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/parts/auth";

const { toast } = useToast()
const router = useRouter()
const authStore = useAuthStore()
const inputRef = ref(null)
const registerFields: Register = reactive({
  phone: '',
  password: '',
  password_repeat: '',
  verify_type: ''
})
const registerTypes = ref([])
const confirmationCode = ref('')
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

async function registerCheck () {
  const {data} = await api.auth.registerCheckApi({
    phone: registerFields.phone,
    code: confirmationCode.value
  })

  if(data.success) {
    authStore.isLoggedIn = true
    localStorage.setItem('accessToken', data.token)
    await router.push({name: 'Profile'})
  }
  else {
    toast.error(data.error_message)
  }
}

function enterCode () {
  inputRef.value.focus()
}

onMounted(() => {
  getAvailableRegisterTypes()
})

watch(confirmationCode, (newValue) => {
  if(newValue.length === 4) registerCheck()
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
            placeholder="Пароль"
        />
        <app-input
            v-model="registerFields.password_repeat"
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
          <svg
              data-v-6fdda0ab=""
              data-v-4561fb79=""
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="external-confirm__button-svg"
          >
            <path
                data-v-6fdda0ab=""
                data-v-4561fb79=""
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.09992 6.17238C5.39488 4.31288 8.25885 3.08698 9.69185 2.49469C13.7834 0.803569 14.6335 0.509804 15.1877 0.500103C15.3095 0.49797 15.5821 0.527985 15.7586 0.670319C15.9076 0.790503 15.9486 0.952855 15.9683 1.0668C15.9879 1.18075 16.0123 1.44033 15.9929 1.64315C15.7712 3.95816 14.8118 9.57609 14.3237 12.1689C14.1172 13.2661 13.7105 13.6339 13.3169 13.6699C12.4613 13.7482 11.8116 13.1081 10.9829 12.5683C9.68624 11.7236 8.9537 11.1978 7.69503 10.3736C6.24043 9.42102 7.18338 8.89748 8.01236 8.04188C8.22931 7.81796 11.999 4.41067 12.0719 4.10158C12.0811 4.06292 12.0895 3.91882 12.0034 3.84274C11.9172 3.76665 11.7901 3.79267 11.6983 3.81336C11.5683 3.84269 9.4968 5.20328 5.48389 7.89511C4.89591 8.29633 4.36333 8.49182 3.88616 8.48157C3.36012 8.47028 2.34822 8.18601 1.59598 7.94302C0.673328 7.64498 -0.0599784 7.48741 0.00387615 6.98125C0.0371355 6.71761 0.402482 6.44799 1.09992 6.17238Z"
                fill="#140E38"
            />
          </svg>
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
        ПОДТВЕРДИТЬ
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

    <teleport to="body">
      <modal-dialog
          v-model="isConfirmModalOpen"
          back-icon
          size="full"
          class="confirm-phone-modal-dialog"
          :close-icon="false"
      >
        <template #header>
          <h2 class="modal__title">Авторизация</h2>
          <a
              href="tel:+78006002665"
              class="modal__header__phone"
          >
            <svg data-src="/img/icons/phone.svg"/>
          </a>
        </template>
        <template #body>
          <progress-linear v-if="isRegisterCheckPending"/>
          <h2 class="confirm-phone-modal-dialog__title">Введите Проверочный код из голосового сообщения</h2>
          <div class="confirm-phone-modal-dialog__input-box">
            <input
                ref="inputRef"
                v-model="confirmationCode"
                type="text"
                class="confirm-phone-modal-dialog__input-box__input"
                inputmode="numeric"
                v-maska
                data-maska="####"
            >
            <div
                v-for="(num, index) in 4"
                class="confirm-phone-modal-dialog__input-box__item"
                @click="enterCode"
            >
              <transition name="bounce">
                <p v-if="confirmationCode[index]">{{ confirmationCode[index] }}</p>
              </transition>
              <span />
            </div>
          </div>
        </template>
      </modal-dialog>
    </teleport>
  </div>
</template>