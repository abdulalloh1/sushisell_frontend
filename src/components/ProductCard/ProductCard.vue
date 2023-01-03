<script lang="ts" setup>
import { ref } from 'vue';

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
    <div class="product-card" :class="roll.class">
        <div class="product-card__img">
            <img :src="roll.Image" alt="">
        </div>
        <div class="product-card__items">
            <div class="product-card__text">
                <p class="product-card__name">{{ roll.title }}</p>
                <p :class="['product-card__wishes', { 'show': show }]">
                    Ваши пожелания
                    <label for="1" v-for="(spice, idx) in roll.spices" :key="idx">
                        <input type="checkbox" name="" id="2">
                        <span>{{ spice.label }}</span>
                    </label>
                </p>
                <p class="product-card__price">{{ roll.price }}</p>
            </div>
            <button class="product-card__btn">Заказать</button>
        </div>
    </div>
</template>

<style lang="scss" src="./ProductCard.scss">

</style>