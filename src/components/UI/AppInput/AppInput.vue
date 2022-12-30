<script lang="ts" setup>
import { computed, ref, useSlots, type Ref } from 'vue';
import { vMaska as mask } from 'maska';

const slots = useSlots();
const props = defineProps({
    type: {
        type: String,
        default: 'text',
        validator: (value: string) => {
            return ['text', 'password', 'email', 'tel', 'number', 'search'].includes(value);
        }
    },
    icon: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    isError: {
        type: Boolean,
        default: false
    },
    errorText: {
        type: String,
        default: ''
    },
    width: {
        type: [Number, String],
        default: () => null
    },
    height: {
        type: [Number, String],
        default: () => null
    },
    placeholder: {
        type: String,
    },
    modelValue: {
        type: String,
    },
    mask: {
        type: String
    },
    format: {
        type: Function
    },
    large: {
        type: Boolean,
        default: false
    }
});

const prependSlot: Ref<Element | null> = ref(null);
const appendSlot: Ref<Element | null> = ref(null);
const isInputFocused = ref(false);
const emit = defineEmits(['update:modelValue']);

const computedModelValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        let val = props.format ? props.format(value) : value;

        emit('update:modelValue', val);
    }
});

const computePaddingFromLeft = computed(() => {
    if (!prependSlot?.value) return;

    const prependSlotWidth = prependSlot.value.clientWidth + 8;
    return prependSlotWidth ? `${prependSlotWidth}px` : '0';
});

const computePaddingFromRight = computed(() => {
    if (!appendSlot?.value) return;
    const appendSlotWidth = appendSlot.value.clientWidth + 8;
    return appendSlotWidth ? `${appendSlotWidth}px` : '0';
});

const computedStyles = computed(() => {
    return {
        'padding-left': computePaddingFromLeft.value,
        'padding-right': computePaddingFromRight.value,
        'width': computedWidth.value,
        'height': computedHeight.value
    };
});

const computedWidth = computed(() => {
    if (!props.width) return false;
    if (props.width) return props.width + (typeof props.width === 'number' ? 'px' : '');

    return false;
});

const computedHeight = computed(() => {
    if (props.height) return props.height + (typeof props.height === 'number' ? 'px' : '');

    return false;
});

const toggleInputFocus = (val: boolean) => {
  isInputFocused.value = val;
}
</script>

<template>
    <div class="app-input">
        <div class="app-input__row">
            <div v-if="$slots.prepend" v-once ref="prependSlot" class="app-input__prepend">
                <slot name="prepend" />
            </div>
            <input
                :readonly="props.readonly"
                :type="props.type"
                :placeholder="props.placeholder"
                class="app-input__field"
                @focus="toggleInputFocus(true)"
                @focusout="toggleInputFocus(false)"
            />
            <div
                v-if="$slots.append || isError"
                ref="appendSlot"
                class="app-input__append"
            >
                <slot name="append" />
                <!-- <svg v-if="isError" class="app-input__append__info-svg" data-src="/images/icons/info.svg" /> -->
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./AppInput.scss">

</style>