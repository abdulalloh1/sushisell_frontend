<template>
  <teleport to="body">
    <modal-dialog
        v-model="computedModelValue"
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
        <progress-linear v-if="loading"/>
        <h2 class="confirm-phone-modal-dialog__title">{{ title }}</h2>
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
        <slot />
      </template>
    </modal-dialog>
  </teleport>
</template>

<script lang="ts" setup>
import { vMaska } from 'maska';
import ModalDialog from "@/components/UI/ModalDialog/ModalDialog.vue";
import ProgressLinear from "@/components/UI/ProgressLinear/ProgressLinear.vue";
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean,
  title: {
    type: String,
    default: 'Введите код'
  }
})
const emit = defineEmits(['submit', 'update:modelValue'])

const confirmationCode = ref('')
const inputRef = ref(null)

const computedModelValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

function enterCode () {
  inputRef.value.focus()
}

watch(confirmationCode, (newVal) => newVal.length === 4 ? emit('submit', newVal) : '')
</script>

<style lang="scss" src="./AuthPhoneConfirmationModal.scss" />