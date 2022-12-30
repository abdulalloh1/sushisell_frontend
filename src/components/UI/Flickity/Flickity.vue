<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import Flickity from 'flickity'

const props = defineProps({
    options: {
        type: Object,
    },
});
let flickity: typeof Flickity | null = null
const root = ref<HTMLElement | null>(null)

onMounted(() => flickity = new Flickity(root.value as HTMLElement, { ...props.options, imagesLoaded: true }))
onUnmounted(() => flickity?.destroy())

</script>

<template>
    <div ref="root" class="flickity">
        <slot />
    </div>
</template>

<style lang="scss" src="./Flickity.scss"></style>
  