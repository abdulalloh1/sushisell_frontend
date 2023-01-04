<script
    lang="ts"
    setup
>
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: false
  },
  value: {
    type: String,
    default: ''
  },
})

const emit = defineEmits([
  'change', 'update:modelValue'
])

const randomID = Math.floor(Math.random() * 100)

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

</script>

<template>
  <div class="radio">
    <input
        type="radio"
        :id="`${randomID}`"
        :value="value"
        v-model="localValue"
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
></style>