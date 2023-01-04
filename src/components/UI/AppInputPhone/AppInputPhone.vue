<script
    lang="ts"
    setup
>
import { defineEmits, defineProps, ref, watch } from 'vue';
import AppInput from '@/components/UI/AppInput/AppInput.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '+7(___)___-__-__'
  },
  large: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);
const formattedValue = ref(props.modelValue);

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
      :placeholder="placeholder"
      :large="large"
  />
</template>


<style
    lang="scss"
    src="./AppInputPhone.scss"
/>