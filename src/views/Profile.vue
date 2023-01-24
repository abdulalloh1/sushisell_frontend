<template>
  <div class="page">
    Profile page
    <br>
    <button
        @click="logOut"
    >
      Выйти
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/parts/auth";
import { useCitiesStore } from "@/store/parts/cities";

const router = useRouter()

// Store
const authStore = useAuthStore()
const citiesStore = useCitiesStore()

function logOut () {
  const hasActiveCityExternalId = citiesStore.activeCity.external_id
  if(hasActiveCityExternalId) localStorage.removeItem('externalAccessToken')
  else localStorage.removeItem('accessToken')
  authStore.isLoggedIn = false
  router.push({name: 'Login'})
}

onMounted(() => {
  if(!authStore.isLoggedIn) router.push({name: 'Login'})
})

</script>