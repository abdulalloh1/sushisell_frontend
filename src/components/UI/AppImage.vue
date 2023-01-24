<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    default: '/img/defaultImage.png'
  }
})
</script>

<template>
  <img
      :src="src"
      alt=""
  >
</template>