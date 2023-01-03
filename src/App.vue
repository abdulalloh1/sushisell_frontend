<script
    lang="ts"
    setup
>
import AppHeader from "./components/layout/AppHeader/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter/AppFooter.vue";

import { useCitiesStore } from "@/store/parts/cities";
import { onMounted } from "vue";

const citiesStore = useCitiesStore()

onMounted(() => {
  citiesStore.getCities()
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
