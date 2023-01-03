<script
    lang="ts"
    setup
>
import { computed, defineProps } from 'vue';

const props = defineProps({
  to: {
    type: [String, Object],
    default: null
  },
  href: {
    type: String,
    default: null
  },
  removable: {
    type: Boolean,
    default: false
  }
});

// const emit = defineEmits([
//   'remove'
// ]);

const componentType = computed(() => {
  return props.to ? 'router-link' : props.href ? 'a' : 'div';
});

// function remove() {
//   emit('remove');
// }
</script>

<template>
  <component
      :is="componentType"
      :class="['chip', {
        'chip--link': to
      }]"
      :to="to"
      :href="href"
  >
    <div class="chip__bg-color"/>
    <slot/>
    <!-- <button
      v-if="removable"
      class="chip__close-btn"
      @click="remove"
    >
      <svg data-src="/img/icons/close.svg"/>
    </button> -->
  </component>
</template>

<style
    lang="scss"
    src="./AppChips.scss"
/>