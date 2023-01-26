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
import AppFooter from "@/components/Layout/AppFooter/Appfooter.vue";
import { useCartStore } from "@/store/parts/cart";
import { useAuthStore } from "@/store/parts/auth";
import DeviceUuidCache from "@/cache/DeviceUuidCache";

// State
const isPreloaderActive = ref(true)

// Store
const citiesStore = useCitiesStore()
const settingStore = useSettingStore()
const menuStore = useMenuStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

onMounted(() => {
  if(!DeviceUuidCache.get()) DeviceUuidCache.set(uuid.v4())

  Promise.all([
    citiesStore.getCities(),
    settingStore.getSetting(),
    menuStore.getMenu(),
    cartStore.getCart(),
  ])
      .finally(() => {
        isPreloaderActive.value = false
        authStore.checkTokenFromLocalstorage()

        if(authStore.isLoggedIn) menuStore.getFavoriteProducts()
      })
})
</script>

<template>
    <template v-if="!isPreloaderActive">
      <app-header />
      <router-view />
      <app-footer />

      <app-toast />
    </template>

</template>

<style lang="scss">
@import "assets/scss/main";
</style>
