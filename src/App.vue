<script
    lang="ts"
    setup
>
import 'external-svg-loader'
import { onMounted, ref } from "vue";
import { useCitiesStore } from "@/store/parts/cities";
import { useSettingStore } from "@/store/parts/setting";
import { useMenuStore } from "@/store/parts/menu";
import {uuid} from "vue3-uuid";

// Components
import AppHeader from "@/components/Layout/AppHeader/AppHeader.vue";
import AppToast from "@/components/UI/AppToast/AppToast.vue";
import Appfooter from "@/components/Layout/AppFooter/Appfooter.vue";
import { useCartStore } from "@/store/parts/cart";

// State
const isPreloaderActive = ref(true)

// Store
const citiesStore = useCitiesStore()
const settingStore = useSettingStore()
const menuStore = useMenuStore()
const cartStore = useCartStore()

onMounted(() => {
  if(!localStorage.getItem('deviceUUID')) localStorage.setItem('deviceUUID', uuid.v4())
  Promise.all([
    citiesStore.getCities(),
    settingStore.getSetting(),
    menuStore.getMenu(),
    cartStore.getCart()
  ])
      .finally(() => {
        isPreloaderActive.value = false
      })
})
</script>

<template>
    <template v-if="!isPreloaderActive">
      <app-header />
      <router-view />
      <appfooter />

      <app-toast />
    </template>

</template>

<style lang="scss">
@import "assets/scss/main";
</style>
