<script
    lang="ts"
    setup
>
import { ref } from 'vue';
import AppCheckBox from '../UI/AppCheckBox/AppCheckBox.vue';
import SlideInOutAnimation from "@/components/UI/SlideInOutAnimation/SlideInOutAnimation.vue";
import { useCartStore } from "@/store/parts/cart";
import { useAuthStore } from "@/store/parts/auth";
import { useMenuStore } from "@/store/parts/menu";
import AppImage from "@/components/UI/AppImage.vue";
import { useModifiersModal } from "@/composables/modifiersModal";

const props = defineProps({
  roll: {
    type: Object,
    required: true
  }
});

const isActive = ref(false)
const isWishesListOpen = ref(false)
const selectedWishes = ref([])

const modifiersModalComposable = useModifiersModal()
const cartStore = useCartStore()
const authStore = useAuthStore()
const menuStore = useMenuStore()

function toggleWishesList () {
  isWishesListOpen.value = !isWishesListOpen.value
}

function makeOrder () {
  if(props.roll.available_modifiers?.length) return openModifiersModal()

  cartStore.addRemoveProduct(props.roll.id, 1, selectedWishes.value)
}

function openModifiersModal () {
  modifiersModalComposable.roll.value = props.roll
  modifiersModalComposable.isModifiersModalOpen.value = true
}

function addRemoveProduct (action: string) {
  if(action === 'plus') props.roll.quantity += 1
  else if (action === 'minus') props.roll.quantity -= 1

  if(!props.roll.modifiers_key) {
    cartStore.addRemoveProduct(props.roll.id, props.roll.quantity, selectedWishes.value)
  } else {
    const modifiedProduct = {
      city_id: localStorage.getItem('activeCity'),
      id: props.roll.id,
      kitchen_comments: selectedWishes.value,
      quantity: props.roll.quantity,
      modifiers: props.roll.modifiers_key.split('_').map(id => {
        return {
          group_id: 0,
          quantity: 1,
          id
        }
      }),
      queueKey: `${props.roll.id}_${props.roll.modifiers_key}`
    }
    cartStore.addKitProducts(modifiedProduct)
  }
}

</script>

<template>
  <div
      :class="['product-card', {
        'product-card--active': isActive
      }]"
  >
    <div
        class="product-card__img"
        @click="isActive = !isActive"
    >
      <app-image :src="roll.photo ?? roll.image" />
    </div>
    <div class="product-card__items">
      <button
          v-if="authStore.isLoggedIn"
          :class="['product-card__favorite-btn', {
            'product-card__favorite-btn--active': menuStore.favoriteProducts.includes(String(roll.id))
          }]"
          @click="menuStore.addRemoveFavoriteProduct(roll.id)"
      >
        <svg data-src="/img/icons/heart.svg"/>
      </button>
      <div class="product-card__text">
        <p class="product-card__name">{{ roll.name }}</p>
        <div
            v-if="roll.possible_kitchen_comments?.length"
            class="product-card__wishes"
        >
          <button
              @click="toggleWishesList"
              class="product-card__wishes__btn"
          >
            Ваши пожелания
          </button>
          <slide-in-out-animation v-model="isWishesListOpen">
            <app-check-box
                v-for="(spice, index) in roll.possible_kitchen_comments"
                v-model="selectedWishes"
                :key="index"
                :value="spice.id"
                class="product-card__checkbox"
            >
              <template #label>{{ spice.title }}</template>
            </app-check-box>
          </slide-in-out-animation>
        </div>
      </div>
      <div class="product-card__order">
        <p class="product-card__price">{{ roll.price }} ₽</p>
        <button
            v-if="!roll.quantity || roll.available_modifiers.length"
            class="product-card__btn"
            @click="makeOrder()"
        >
          Заказать
        </button>
        <div
            v-else
            class="product-card__quantityController"
        >
          <button
              class="product-card__quantityController__btn product-card__quantityController__btn--minus"
              @click="addRemoveProduct('minus')"
          >
            -
          </button>
          {{ roll.quantity }}
          <button
              class="product-card__quantityController__btn product-card__quantityController__btn--plus"
              @click="addRemoveProduct('plus')"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style
    lang="scss"
    src="./ProductCard.scss"
/>