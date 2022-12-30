<script lang="ts" setup>
import AppHeader from "./components/layout/AppHeader/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter/AppFooter.vue";
</script>

<template>
  <div class="app">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<style lang="scss">
.app {
  max-width: 767px;
  margin-right: auto;
  margin-left: auto;
}
</style>
