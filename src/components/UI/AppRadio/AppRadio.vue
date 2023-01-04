<script
    lang="ts"
    setup
>
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  value: {
    type: [String, Number],
    required: true
  },
})

const emit = defineEmits([
  'change', 'update:modelValue'
])

const randomID = Math.floor(Math.random() * 100)

const computedModelValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

function change() {
  computedModelValue.value = props.value
}

</script>

<template>
  <div class="radio">
    <input
        type="radio"
        :id="`${randomID}`"
        :value="value"
        :checked="computedModelValue === value"
        @change="change"
    >
    <label
        :for="`${randomID}`"
        class="checkbox__label"
    >
        <span class="checkbox__label__text">
            <slot name="label"/>
        </span>
    </label>
  </div>
</template>

<style
    lang="scss"
    src="./AppRadio.scss"
/>