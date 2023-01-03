<script
    lang="ts"
    setup
>
import { useCitiesStore } from "@/store/parts/cities";
import { ref } from "vue";
import ModalDialog from "@/components/UI/ModalDialog/ModalDialog.vue";

const citiesStore = useCitiesStore()
const isCitiesListModalOpen = ref(false)

function openCitiesListModal () {
  isCitiesListModalOpen.value = true
}
</script>


<template>
  <div class="app-header">
    <div class="app-header-wrapper">
      <div class="app-header__logo">
        <img
            alt=""
            src="/public/img/sushilogo.svg"
        >
      </div>
      <button
          class="app-header__city"
          @click="openCitiesListModal"
      >
        <svg data-src="img/location.svg"/>
        {{ citiesStore.activeCity }}
      </button>
      <div class="app-header__msg">
        <img
            alt=""
            src="/public/img/message.png"
        >
      </div>
      <div class="app-header__tel">
        <svg data-src="img/phone.svg" />
      </div>
    </div>

    <teleport to="body">
      <modal-dialog
          v-model="isCitiesListModalOpen"
          :close-icon="false"
          class="cities-list-modal-dialog"
      >

      </modal-dialog>
    </teleport>
  </div>
</template>


<style
    lang="scss"
    src="./AppHeader.scss"
/>