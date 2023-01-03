<script
    lang="ts"
    setup
>
import AppHeader from "./components/layout/AppHeader/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter/AppFooter.vue";
import { useCitiesStore } from "@/store/cities";
import { onMounted } from "vue";

const useCities = useCitiesStore()

onMounted(() => {
  useCities.getCities()
})
</script>

<template>
  <app-header/>
  <router-view/>
  <app-footer/>
</template>

<style lang="scss">
@import "assets/scss/main";
</style>
