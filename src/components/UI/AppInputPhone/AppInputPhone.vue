<script
    lang="ts"
    setup
>
import { defineProps, ref, watch } from 'vue';
import AppInput from '@/components/UI/AppInput/AppInput.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Номер телефона'
  },
  large: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);
const formattedValue = ref(props.modelValue);
const modifiedPlaceholder = ref(props.placeholder)
const isFocused = ref(false)

function onHover () {
  modifiedPlaceholder.value = '+7(___)___-__-__'
}

function unHover () {
  if(isFocused.value) return
  modifiedPlaceholder.value = props.placeholder
}

function onFocusToggle (val: boolean) {
  isFocused.value = val
  if(!val) unHover()
}

watch(formattedValue, (val) => {
  let formattedValueAsNumber = val
      .replace(/\D+/g, '')
      .replace('+', '')
      .replace('7', '');
  emit('update:modelValue', formattedValueAsNumber);
});
</script>

<template>
  <app-input
      v-model="formattedValue"
      :mask="'+7(###)###-##-##'"
      :placeholder="modifiedPlaceholder"
      :large="large"
      @mousemove="onHover"
      @mouseleave="unHover"
      @focus="onFocusToggle(true)"
      @focusout="onFocusToggle(false)"
  />
</template>


<style
    lang="scss"
    src="./AppInputPhone.scss"
/>