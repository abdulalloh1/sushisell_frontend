<script
    lang="ts"
    setup
>
import { computed, defineProps } from "vue";
import AppChip from "@/components/UI/Chips/AppChip.vue";

const props = defineProps({
  modelValue: {
    type: [Array, String, Number],
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: String,
    default: 'value'
  },
  itemText: {
    type: String,
    default: 'label'
  }
})
const emit = defineEmits(['update:modelValue'])

const computedModelValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

const computedItems = computed(() => {
  return props.items.map(item => {
    if(Array.isArray(computedModelValue.value)) {
      item.isActive = !!computedModelValue.value.includes(item[props.itemValue]);
    }
    else {
      item.isActive = computedModelValue.value == item[props.itemValue]
    }

    return item
  })
})

function toggleSelect(value: string) {
  if(Array.isArray(computedModelValue.value)) {
    if (computedModelValue.value.includes(value)) {
      computedModelValue.value = computedModelValue.value.filter(item => item !== value ? item : '')
    } else {
      computedModelValue.value.push(value)
    }
  }
  else {
    computedModelValue.value = value
  }
}

</script>
<template>
  <div class="chips">
    <app-chip
        v-for="chip in computedItems"
        :key="chip[itemValue]"
        :class="{'chip--active': chip.isActive}"
        @click="toggleSelect(chip[itemValue])"
    >
      {{ chip[itemText] }}
    </app-chip>
  </div>
</template>