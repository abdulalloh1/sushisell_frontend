<script lang="ts" setup>
const props = defineProps({
    roll: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="product-card" :class="roll.class">
        <div class="product-card__img">
            <img :src="roll.Image" alt="">
        </div>
        <div class="product-card__items">
            <div class="product-card__text">
                <p class="product-card__name">{{ roll.title }}</p>
                <p class="product-card__wishes">
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