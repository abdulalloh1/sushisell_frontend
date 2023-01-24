<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    default: '/img/defaultImage.jpeg'
  }
})
</script>

<template>
  <img
      :src="src"
      alt=""
  >
</template>