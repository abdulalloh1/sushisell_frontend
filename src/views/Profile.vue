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
import { ExternalAccessToken, InternalAccessToken } from "@/cache/AccessToken";

const router = useRouter()

// Store
const authStore = useAuthStore()
const citiesStore = useCitiesStore()

if(!authStore.isLoggedIn) router.push({name: 'Login'})

function logOut () {
  if(citiesStore.hasActiveCityExternalId) {
    ExternalAccessToken.clear()
  }
  else {
    InternalAccessToken.clear()
  }

  authStore.isLoggedIn = false
  router.push({name: 'Login'})
}

</script>