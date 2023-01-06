<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  modelValue: Boolean
})
const content = ref()

function beforeEnter (_t) {
  _t.style.display = 'block'
  _t.myHeight = content.value.offsetHeight
}

function enter (_t) {
  _t.style.maxHeight = _t.myHeight + 'px'
}

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.contentRect.height) {
      content.value.parentNode.style.maxHeight = entry.contentRect.height + 'px'
    }
  })
})

onMounted(() => {
  observer.observe(content.value)
})

</script>

<template>
  <div>
    <transition
      name="slideInOutAnimation"
      @enter="enter"
      @before-enter="beforeEnter"
    >
      <div v-show="modelValue">
        <div
          id="content"
          ref="content"
        >
          <slot/>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" src="./SlideInOutAnimation.scss"/>