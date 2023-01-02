<script lang="ts" setup>
import { reactive, ref } from 'vue';
// import AppChips from '@/components/UI/Chips/AppChips.vue';
import AppChips from '@/components/UI/Chips/AppChips.vue';
import AppInput from '@/components/UI/AppInput/AppInput.vue'
import Flickity from '../../components/UI/Flickity/Flickity.vue';
import ProductCard from '@/components/ProductCard/ProductCard.vue';

const dataInput = {
  title: 'Поиск по названию, например: суши калифорния',
  type: 'search'
}

const images = reactive([
  {
    img: '/public/slider-roll.jpeg'
  },
  {
    img: '/public/slider-roll-2.jpeg'
  },
  {
    img: '/public/slider-roll-3.jpeg'
  },
  {
    img: '/public/slider-roll-4.jpeg'
  },
  {
    img: '/public/slider-roll-5.jpeg'
  },
  {
    img: '/public/slider-roll-6.jpeg'
  },
  {
    img: '/public/slider-roll-7.jpeg'
  },
  {
    img: '/public/slider-roll-8.jpeg'
  },
  {
    img: '/public/slider-roll-8.jpeg'
  },
  {
    img: '/public/slider-roll-5.jpeg'
  },
  {
    img: '/public/slider-roll-6.jpeg'
  },
])
const state = reactive({
  categories: [
    {
      value: "sale",
      label: 'Акции',
    },
    {
      value: "sets",
      label: 'Наборы',
    },
    {
      value: "rolls",
      label: 'Роллы',
    },
    {
      value: "baked",
      label: 'Запеченные',
    },
    {
      value: "sushi",
      label: 'Суши',
    },
    {
      value: "hot",
      label: 'Горячее',
    },
    {
      value: "business-lunch",
      label: 'Бизнес - ланч',
    },
    {
      value: "cakes",
      label: 'Десерты',
    },
    {
      value: "different",
      label: 'Разное',
    },
  ],
  selectedCategories: []
});

const rolls = [
  {
    Image: '/public/roll-1.webp',
    title: 'Отвал Башки',
    price: 319,
    spices: [
      {
        value: 'no-sesame',
        label: 'Без Кунжута'
      },
      {
        value: 'no-cucmber',
        label: 'Без Огурца'
      },
    ],
    class: 'sale'
  },
  {
    Image: '/public/roll-1.webp',
    title: 'Отвал Башки',
    price: 319,
    spices: [
      {
        value: 'no-sesame',
        label: 'Без Кунжута'
      },
      {
        value: 'no-cucmber',
        label: 'Без Огурца'
      },
    ],
    class: 'sale'
  },
  {
    Image: '/public/roll-1.webp',
    title: 'Отвал Башки',
    price: 319,
    spices: [
      {
        value: 'no-sesame',
        label: 'Без Кунжута'
      },
      {
        value: 'no-cucmber',
        label: 'Без Огурца'
      },
    ],
    class: 'sale'
  },
  {
    Image: '/public/roll-1.webp',
    title: 'Отвал Башки',
    price: 319,
    spices: [
      {
        value: 'no-sesame',
        label: 'Без Кунжута'
      },
      {
        value: 'no-cucmber',
        label: 'Без Огурца'
      },
    ],
    class: 'sets'
  },
  {
    Image: '/public/roll-1.webp',
    title: 'Отвал Башки',
    price: 319,
    spices: [
      {
        value: 'no-sesame',
        label: 'Без Кунжута'
      },
      {
        value: 'no-cucmber',
        label: 'Без Огурца'
      },
    ],
    class: 'sets'
  }
]

let show = ref(false)

const toggleBtn = () => {
  return show.value = !show.value
}

const flickityOptions = {
  pageDots: false,
  groupCells: 1,
  fullscreen: true,
  wrapAround: true
}

</script>

<template>
  <div class="main-page page">
    <div class="main-wrapper">
      <div class="main-slider">
        <flickity ref="flickity" :options="flickityOptions">
          <div class="main-slider-item" v-for="(item, idx) in images" :key="idx">
            <img class="main-slider-item__img" :src="item.img" alt="main page slider image">
          </div>
        </flickity>
      </div>
      <div class="main__chips">
        <app-chips v-model="state.selectedCategories" :items="state.categories" />
      </div>
      <div :class="['main-control__items', { 'show': show }]">
        <div class="main-control__btns">
          <button @click="toggleBtn" class="main-control__btn">
            {{ show ? 'Спрятать фильтр' : 'Показать фильтр'}}
          </button>
          <button class="main-control__icon">
            <svg width="16" height="16" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path data-v-3d4be795=""
                d="M4 6H6L3.34375 8.65625L0.65625 6H2.65625C2.65625 4.54167 3.17708 3.29167 4.21875 2.25C5.28125 1.1875 6.54167 0.65625 8 0.65625C9.04167 0.65625 9.98958 0.9375 10.8438 1.5L9.875 2.46875C9.3125 2.15625 8.6875 2 8 2C6.89583 2 5.94792 2.39583 5.15625 3.1875C4.38542 3.95833 4 4.89583 4 6ZM12.6562 3.34375L15.3438 6H13.3438C13.3438 7.45833 12.8125 8.71875 11.75 9.78125C10.7083 10.8229 9.45833 11.3438 8 11.3438C6.95833 11.3438 6.01042 11.0625 5.15625 10.5L6.125 9.53125C6.6875 9.84375 7.3125 10 8 10C9.10417 10 10.0417 9.61458 10.8125 8.84375C11.6042 8.05208 12 7.10417 12 6H10L12.6562 3.34375Z"
                fill="#777"></path>
            </svg>
          </button>
        </div>
        <div class="main-control__input">
          <app-input :placeholder="dataInput.title" :type="dataInput.type">
            <template #label>
              title
            </template>
          </app-input>
        </div>
      </div>
      <div class="main__rolls">
        <product-card
          v-for="(roll, idx) in rolls"
          :key="idx"
          :roll="roll"
        />
      </div>
    </div>
  </div>
</template>


<style lang="scss" src="./MainPage.scss" />