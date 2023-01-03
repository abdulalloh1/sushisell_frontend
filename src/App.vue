<script
    lang="ts"
    setup
>
import AppHeader from "./components/layout/AppHeader/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter/AppFooter.vue";</script>

<template>
  <app-header/>
  <router-view/>
  <app-footer/>
</template>

<style lang="scss">
@import "assets/scss/main";
</style>
