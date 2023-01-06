<script
    lang="ts"
    setup
>
import type { Login } from "@/types/auth";
import { computed, reactive } from 'vue';
import { useAuthStore } from "@/store/parts/auth";

import AppInput from '@/components/UI/AppInput/AppInput.vue';
import AppInputPhone from "@/components/UI/AppInputPhone/AppInputPhone.vue";

const authStore = useAuthStore()
const loginCredentials: Login = reactive({
  phone: '',
  password: ''
})

const computedSubmitBtnDisabled = computed(() => {
  return !loginCredentials.phone.trim() || !loginCredentials.password.trim()
})

async function login () {
  await authStore.login(loginCredentials)
}

</script>

<template>
  <div class="auth">
    <form
        class="auth__input-wrapper"
        @submit.prevent="login"
    >
      <h3 class="auth__title">
        Вход / регистрация
      </h3>
      <app-input-phone
          v-model="loginCredentials.phone"
      />
      <app-input
          type="password"
          placeholder="Пароль"
          :width="270"
          v-model="loginCredentials.password"
      />
      <button
          type="submit"
          class="auth__btn"
          :disabled="computedSubmitBtnDisabled"
      >
        Войти
      </button>
    </form>
    <div class="auth__links">
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