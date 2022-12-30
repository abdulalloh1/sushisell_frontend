<script lang="ts" setup>
import { reactive } from 'vue';
// import AppChips from '@/components/UI/Chips/AppChips.vue';
import AppChips from '@/components/UI/Chips/AppChips.vue';
import AppInput from '@/components/UI/AppInput/AppInput.vue'
import Flickity from '../../components/UI/Flickity/Flickity.vue';

const dataInput = {
  title: 'Введите текст'
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

const flickityOptions = {
    pageDots: false,
    groupCells: 1,
    fullscreen: true,
    wrapAround: true
}

</script>

<template>
    <div class="main-page page">
        <div class="container">
            <div class="main-wrapper">
                <div class="main-slider">
                    <flickity ref="flickity" :options="flickityOptions">
                        <div class="main-slider-item" v-for="(item, idx) in images" :key="idx">
                            <img class="main-slider-item__img" :src="item.img" alt="main page slider image">
                        </div>
                    </flickity>
                </div>
                <div class="main__chips">
                    <app-chips
                        v-model="state.selectedCategories"
                        :items="state.categories"
                    />
                  </div>
                  <app-input :placeholder="dataInput.title">
                    <template #label>
                      title
                    </template>
                  </app-input>
            </div>
        </div>
    </div>
</template>


<style src="./MainPage.scss">

</style>