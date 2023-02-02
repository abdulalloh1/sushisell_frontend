<script
    lang="ts"
    setup
>
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref } from 'vue';
import { useMenuStore } from "@/store/parts/menu";
import AppInput from '@/components/UI/AppInput/AppInput.vue'
import Flickity from '@/components/UI/Flickity/Flickity.vue';
import ProductCard from '@/components/WorkSpace/ProductCard/ProductCard.vue';
import AppChip from "@/components/UI/Chips/AppChip.vue";
import ModifiersModal from "@/components/WorkSpace/ModifiersModal/ModifiersModal.vue";

// Store
const menuStore = useMenuStore()

const categoryChipsRef: Ref<HTMLDivElement | null> = ref(null)
const isFilterOpen = ref(false)
const flickityOptions = {
  pageDots: false,
  groupCells: 1,
  fullscreen: true,
  wrapAround: true
}
const activeCategory: Ref<number> = ref(0)
const isScrolling = ref(false)
const isModifiersModalOpen = ref(false)
const rollWithModifiers: Ref<object> = ref({})

// Functions
function toggleFilterVisibility () {
  isFilterOpen.value = !isFilterOpen.value
}

function selectCategory (id: number) {
  isScrolling.value = true
  const element = document.getElementById(`categoryID=${id}`)
  window.scrollTo({top: element!.offsetTop - 110})
}

function activateChip () {
  const elementOffsetTop = categoryChipsRef.value!.offsetTop
  const scrollTop = window.scrollY

  if(elementOffsetTop <= scrollTop) {
    categoryChipsRef.value!.children[0].classList.add('chips--fixed')
    document.querySelector('.app-header')!.classList.add('app-header--no-shadow')
  }
  else {
    categoryChipsRef.value!.children[0].classList.remove('chips--fixed')
    document.querySelector('.app-header')!.classList.remove('app-header--no-shadow')
  }

  const categoryProducts: NodeListOf<HTMLDivElement> = document.querySelectorAll('.main__rolls')
  categoryProducts.forEach((category: HTMLElement) => {
    let scrollTop = window.scrollY;
    let offset = category.offsetTop;

    if(scrollTop + 120 >= offset) {
      activeCategory.value = +category.id.replace('categoryID=', '')
    }
  })
}

function isCategoryKit (str: string) {
  return str.replace(/[^a-zA-Z]+/g, '') === 'nabori'
}

function openModifiersModal (roll: object) {
  rollWithModifiers.value = roll
  isModifiersModalOpen.value = true
}

onMounted(() => {
  window.addEventListener('scroll', activateChip)
})

onUnmounted(() => {
  window.removeEventListener('scroll', activateChip)
})

</script>

<template>
  <div class="main-page page">
    <div class="main-wrapper">
      <div class="main-slider">
        <flickity
            ref="flickity"
            :options="flickityOptions"
        >
<!--          <div-->
<!--              v-for="(item, idx) in images"-->
<!--              :key="idx"-->
<!--              class="main-slider-item"-->
<!--          >-->
<!--            <img-->
<!--                :src="item.img"-->
<!--                alt="main page slider image"-->
<!--                class="main-slider-item__img"-->
<!--            >-->
<!--          </div>-->
        </flickity>
      </div>
      <div
          ref="categoryChipsRef"
          class="main__chips"
      >
        <div class="chips">
          <div class="chips__wrapper">
            <app-chip
                v-for="(category, index) in menuStore.computedCategoriesAndProducts"
                :key="index"
                :class="{'chip--active': activeCategory === category.id}"
                @click="selectCategory(category.id)"
            >
              {{ category.name }}
            </app-chip>
          </div>
        </div>
      </div>
      <div :class="['main-control__items', { 'show': isFilterOpen }]">
        <div class="main-control__btns">
          <button
              class="main-control__btn"
              @click="toggleFilterVisibility"
          >
            {{ isFilterOpen ? 'Спрятать фильтр' : 'Показать фильтр' }}
          </button>
          <button class="main-control__icon">
            <svg
                fill="none"
                height="16"
                viewBox="0 0 16 12"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M4 6H6L3.34375 8.65625L0.65625 6H2.65625C2.65625 4.54167 3.17708 3.29167 4.21875 2.25C5.28125 1.1875 6.54167 0.65625 8 0.65625C9.04167 0.65625 9.98958 0.9375 10.8438 1.5L9.875 2.46875C9.3125 2.15625 8.6875 2 8 2C6.89583 2 5.94792 2.39583 5.15625 3.1875C4.38542 3.95833 4 4.89583 4 6ZM12.6562 3.34375L15.3438 6H13.3438C13.3438 7.45833 12.8125 8.71875 11.75 9.78125C10.7083 10.8229 9.45833 11.3438 8 11.3438C6.95833 11.3438 6.01042 11.0625 5.15625 10.5L6.125 9.53125C6.6875 9.84375 7.3125 10 8 10C9.10417 10 10.0417 9.61458 10.8125 8.84375C11.6042 8.05208 12 7.10417 12 6H10L12.6562 3.34375Z"
                  data-v-3d4be795=""
                  fill="#777"
              ></path>
            </svg>
          </button>
        </div>
        <div class="main-control__input">
          <app-input
              type="search"
              placeholder="Поиск по названию, например: суши калифорния"
          />
        </div>
      </div>
      <div
          v-for="(category, categoryIndex) in menuStore.computedCategories"
          class="main__rolls"
          :key="categoryIndex"
          :id="`categoryID=${category.id}`"
      >
        <h4 class="main__rolls__title">{{ category.name }}</h4>
        <template v-if="category.products.length">
          <product-card
              v-for="(product, productIndex) in category.products"
              :key="productIndex"
              :roll="product"
              :class="{'product-card--active': isCategoryKit(category.url ?? category.slug)}"
              @openModifiersModal="openModifiersModal"
          />
        </template>
        <h4 class="main__rolls__description">{{ category.description }}</h4>
      </div>
    </div>
    <modifiers-modal
        v-model="isModifiersModalOpen"
        :roll="rollWithModifiers"
    />
  </div>
</template>