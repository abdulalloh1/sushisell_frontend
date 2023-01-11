<script
    setup
    lang="ts"
>
import { computed, defineProps } from "vue";
import { generatorRandomID } from "@/utils/helper";

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
const randomID = generatorRandomID()

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
  <div
      :class="['checkbox', {
        'checkbox--disabled': disabled
      }]"
  >
    <input
        :id="`${randomID}`"
        :checked="computedChecked"
        :disabled="disabled"
        :value="computedValue"
        class="checkbox__input"
        type="checkbox"
        @change="change()"
    >
    <label
        :for="`${randomID}`"
        class="checkbox__label"
    >
      <span class="checkbox__label__icon" />
      <span class="checkbox__label__text">
          <slot name="label"/>
      </span>
    </label>
  </div>
</template>


<style lang="scss" src="./AppCheckBox.scss"/>