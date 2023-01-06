<template>

</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

onMounted(() => {
  if(!localStorage.getItem('accessToken')) router.push({name: 'Login'})
})
</script>