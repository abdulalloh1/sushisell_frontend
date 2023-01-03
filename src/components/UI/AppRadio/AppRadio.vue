<script lang="ts" setup>
import { defineEmits } from 'vue';

const emit = defineEmits([
    'change', 'update:modelValue'
])
const randomID = Math.floor(Math.random() * 100)

function change() {
    emit('update:modelValue')
    emit('change')
}

</script>

<template>
    <div class="radio">
        <input type="radio" :id="`${randomID}`" @change="change()">

        <label :for="`${randomID}`" class="checkbox__label">
            <span class="checkbox__label__text">
                <slot name="label" />
            </span>
        </label>
    </div>
</template>