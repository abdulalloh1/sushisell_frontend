<script setup lang="ts">
import {computed, defineEmits, defineProps} from "vue";

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  value: {
    type: [Number, String],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits([
  'change', 'update:modelValue'
])
const randomID = Math.floor(Math.random() * 100)

const computedValue = computed(() => {
  if (typeof props.modelValue === 'object') {
    return props.value
  } else {
    return props.modelValue
  }
})
const computedChecked = computed(() => {
  if (typeof props.modelValue === 'object') {
    return props.modelValue.includes(props.value)
  } else {
    return props.modelValue
  }
})

function change() {
  if (typeof props.modelValue === 'object') {
    toggleArrayValue()
  } else {
    toggleBooleanValue()
  }
}

function toggleBooleanValue() {
  emit('update:modelValue', !computedValue.value)
  emit('change', !computedValue.value)
}

function toggleArrayValue() {
  if (props.modelValue.includes(props.value)) {
    removeFromArray()
  } else {
    props.modelValue.push(props.value)
  }
  emit('change', computedValue.value)
}

function removeFromArray() {
  const index = props.modelValue.findIndex(item => item === props.value)
  props.modelValue.splice(index, 1)
}
</script>

<template>
  <div :class="['checkbox', {
    'checkbox--disabled': disabled
}]">
    <input
        :id="`${randomID}`"
        :checked="computedChecked"
        :disabled="disabled"
        :value="computedValue"
        class="checkbox__input"
        type="checkbox"
        @change="change()"
    >
    <label :for="`${randomID}`" class="checkbox__label">
            <span class="checkbox__label__icon">
                <svg width="12px" height="12px" viewBox="-1.6 -1.6 19.20 19.20" version="1.1"
                     fill="#009846" stroke="#009846" stroke-width="1.6"
                     transform="matrix(1, 0, 0, 1, 0, 0)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                        <rect x="-1.6" y="-1.6" width="19.20" height="19.20" rx="0" fill="#009846" strokewidth="0">
                        </rect>
                    </g>
                    <g id="SVGRepo_iconCarrier">
                        <rect width="16" height="16" id="icon-bound" fill="none"></rect>
                        <rect x="2" y="2" width="12" height="12"></rect>
                    </g>
                </svg>
            </span>
      <span class="checkbox__label__text">
                <slot name="label"/>
            </span>
    </label>
  </div>
</template>


<style lang="scss" src="./AppCheckbox.scss"/>