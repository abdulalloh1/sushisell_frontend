<script lang="ts" setup>
import AppHeader from "./components/layout/AppHeader/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter/AppFooter.vue";
</script>

<template>
  <div>
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<style scoped>
</style>
