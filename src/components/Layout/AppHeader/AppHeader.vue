<script
    lang="ts"
    setup
>
import { useCitiesStore } from "@/store/parts/cities";
import { ref } from "vue";
import ModalDialog from "@/components/UI/ModalDialog/ModalDialog.vue";
import AppChip from "@/components/UI/Chips/AppChip.vue";
import AppRadio from "@/components/UI/AppRadio/AppRadio.vue";

const citiesStore = useCitiesStore()
const isCitiesListModalOpen = ref(false)
const isMessageModalOpen = ref(false)
const selectedCity = ref('')
function openCitiesListModal() {
  isCitiesListModalOpen.value = true
}
</script>


<template>
  <div class="app-header">
    <div class="app-header-wrapper">
      <div class="app-header__logo">
        <img alt="" src="/public/img/sushilogo.svg">
      </div>
      <button class="app-header__city" @click="openCitiesListModal">
        <svg data-src="img/location.svg" />
        {{ citiesStore.activeCity }}
      </button>
      <div class="app-header__msg">
        <img alt="" src="/public/img/message.png">
      </div>
      <a href="tel:+78006002665" class="app-header__tel">
        <svg data-src="img/phone.svg" />
      </a>
    </div>

    <teleport to="body">
      <modal-dialog v-model="isCitiesListModalOpen" :close-icon="false" class="cities-list-modal-dialog" size="full">
        <template #header>
          <h2 class="modal__title">Выберите город</h2>
          <a href="tel:+78006002665" class="modal__header__phone">
            <svg data-src="img/phone.svg" />
          </a>
        </template>
        <template #body>
          <div class="cities-list-modal-dialog__list">
            <div v-for="(city, index) in citiesStore.cities" class="app-radio">
              <app-radio v-model="selectedCity" :value="city.name"/>
              <label for="" class="app-radio__label">{{ city.name }}</label>
            </div>
          </div>
        </template>
      </modal-dialog>

      <modal-dialog v-model="isMessageModalOpen" class="message-modal-dialog">
        <template #body>
          <app-chip class="message-modal-dialog__chip message-modal-dialog__chip--telegram">
            <svg data-src="/img/telegram.svg" />
            Написать в Telegram
          </app-chip>
        </template>
      </modal-dialog>
    </teleport>
  </div>
</template>






<style
    lang="scss"
    src="./AppHeader.scss"
/>