<script setup lang="ts">
import { defineProps, computed, defineEmits } from "vue";

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
            :value="computedValue"
            :disabled="disabled"
            class="checkbox__input"
            type="checkbox"
            @change="change()"
        >
        <label
            :for="`${randomID}`"
            class="checkbox__label"
        >
            <span class="checkbox__label__icon">
                <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.46875 9.59672L10.9868 18.0947L27.4981 2.07593" stroke="var(--current-color)"
                        stroke-width="5.00586" 
                    />
                </svg>
            </span>
            <span class="checkbox__label__text">
                <slot name="label" />
            </span>
        </label>
    </div>
</template>

<style lang="scss" src="./AppCheckbox.scss"/>