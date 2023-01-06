<script
    lang="ts"
    setup
>
import { onMounted, ref } from "vue";
import { useCitiesStore } from "@/store/parts/cities";
import { useSettingStore } from "@/store/parts/setting";

// Components
import ModalDialog from "@/components/UI/ModalDialog/ModalDialog.vue";
import AppChip from "@/components/UI/Chips/AppChip.vue";
import AppRadio from "@/components/UI/AppRadio/AppRadio.vue";
import ProgressLinear from "@/components/UI/ProgressLinear/ProgressLinear.vue";

// Store
const citiesStore = useCitiesStore()
const settingStore = useSettingStore()

// State
const isCitiesListModalOpen = ref(false)
const isMessageModalOpen = ref(false)
const isChangeCityLoading = ref(false)

// Functions
function openCitiesListModal() {
  isCitiesListModalOpen.value = true
}

function openMessageModal() {
  isMessageModalOpen.value = true
}

async function changeCity(id: number) {
  isChangeCityLoading.value = true
  await citiesStore.changeActiveCity(id)
  isChangeCityLoading.value = false
  isCitiesListModalOpen.value = false
}

onMounted(() => {
  if (!localStorage.getItem('activeCity')) openCitiesListModal()
})
</script>


<template>
  <div class="app-header">
    <div class="app-header-wrapper">
      <div class="app-header__logo">
        <svg data-src="/img/icons/sushilogo.svg"/>
      </div>
      <button
          class="app-header__city"
          @click="openCitiesListModal"
      >
        <svg data-src="/img/icons/location.svg"/>
        {{ citiesStore.activeCity.name }}
      </button>
      <button
          class="app-header__msg"
          @click="openMessageModal"
      >
        <img
            alt=""
            src="/img/message.png"
        >
      </button>
      <a
          href="tel:+78006002665"
          class="app-header__tel"
      >
        <svg data-src="/img/icons/phone.svg"/>
      </a>
    </div>

    <teleport to="body">
      <modal-dialog
          v-model="isCitiesListModalOpen"
          :close-icon="false"
          :back-icon="!!citiesStore.activeCity.id"
          class="cities-list-modal-dialog"
          size="full"
      >
        <template #header>
          <h2 class="modal__title">Выберите город</h2>
          <a
              href="tel:+78006002665"
              class="modal__header__phone"
          >
            <svg data-src="/img/icons/phone.svg"/>
          </a>
        </template>
        <template #body>
          <progress-linear v-if="isChangeCityLoading || citiesStore.isCitiesFetching" />

          <div class="cities-list-modal-dialog__list">
            <app-radio
                v-for="(city, index) in citiesStore.cities"
                v-model="citiesStore.activeCity.id"
                :key="index"
                :value="city.id"
                @change="changeCity(city.id)"
            >
              <template #label>{{ city.name }}</template>
            </app-radio>
          </div>
        </template>
      </modal-dialog>

      <modal-dialog
          v-model="isMessageModalOpen"
          class="message-modal-dialog"
      >
        <template #body>
          <app-chip
              class="message-modal-dialog__chip message-modal-dialog__chip--telegram"
              :href="settingStore.setting?.tg_link"
          >
            <svg data-src="/img/icons/telegram.svg"/>
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