<script lang="ts" setup>
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/store/parts/auth";

  const router = useRouter()
  const authStore = useAuthStore()

  onMounted(() => {
    if(!authStore.isLoggedIn) return router.push({name: 'Login'})
  })
</script>

<template>

</template>