<script
    lang="ts"
    setup
>
import 'external-svg-loader'
import AppHeader from "./components/Layout/AppHeader/AppHeader.vue";
import AppFooter from "./components/Layout/AppFooter/AppFooter.vue";

import { useCitiesStore } from "@/store/parts/cities";
import { onMounted } from "vue";
import { useSettingStore } from "@/store/parts/setting";
import AppToast from "@/components/UI/AppToast/AppToast.vue";

const citiesStore = useCitiesStore()
const settingStore = useSettingStore()

onMounted(() => {
  Promise.all([
    citiesStore.getCities(),
    settingStore.getSetting()
  ])
})
</script>

<template>
  <app-header/>
  <router-view/>
  <app-footer/>

  <app-toast />
</template>

<style lang="scss">
@import "assets/scss/main";
</style>
