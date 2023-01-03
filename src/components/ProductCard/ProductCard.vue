<script lang="ts" setup>
import { ref } from 'vue';
import AppCheckBox from '../UI/AppCheckBox/AppCheckBox.vue';

const props = defineProps({
  roll: {
    type: Object,
    required: true
  }
});

let show = ref(false)
const toggleBtn = () => {
  return show.value = !show.value
}

</script>

<template>
  <div :class="roll.class" class="product-card">
    <div class="product-card__img">
      <img :src="roll.Image" alt="">
    </div>
    <div class="product-card__items">
      <div class="product-card__text">
        <p class="product-card__name">{{ roll.title }}</p>
        <div :class="['product-card__wishes', { 'show': show }]">
          <button @click="toggleBtn" class="product-card__wishes__btn">Ваши пожелания</button>
          <label v-for="(spice, idx) in roll.spices" :key="idx" for="1" class="product-card__label-wrapper">
            <app-check-box />
            <span class="product-card__label">{{ spice.label }}</span>
          </label>
        </div>
      </div>
      <div class="product-card__order">
        <p class="product-card__price">{{ roll.price }}</p>
        <button class="product-card__btn">Заказать</button>
      </div>
    </div>
  </div>
</template>

<style
    lang="scss"
    src="./ProductCard.scss"
>

</style>