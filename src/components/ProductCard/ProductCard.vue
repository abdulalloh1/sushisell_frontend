<script
    lang="ts"
    setup
>
import { computed, reactive, ref } from 'vue';
import AppCheckBox from '../UI/AppCheckBox/AppCheckBox.vue';
import SlideInOutAnimation from "@/components/UI/SlideInOutAnimation/SlideInOutAnimation.vue";
import ModalDialog from "@/components/UI/ModalDialog/ModalDialog.vue";
import { useCartStore } from "@/store/parts/cart";
import { useAuthStore } from "@/store/parts/auth";
import { useMenuStore } from "@/store/parts/menu";

const props = defineProps({
  roll: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-cart'])

const isActive = ref(false)
const isWishesListOpen = ref(false)
const selectedWishes = ref([])
const isModifiersModalOpen = ref(false)
const selectedModifier = reactive({
  groupIDs: [],
  IDs: []
})
const cartStore = useCartStore()
const authStore = useAuthStore()
const menuStore = useMenuStore()

const computedModifierGroupsIDs = computed(() => {
  if (!props.roll.modifier_groups) return

  const groupIDs: number[] = []
  props.roll.available_modifiers
      .sort(item => item.sort_order)
      .map(item => {
        if (!groupIDs.includes(item.group_id)) groupIDs.push(item.group_id)
      })

  return groupIDs
})
const computedModifiers = computed(() => {
  if (!computedModifierGroupsIDs.value.length) return

  return props.roll.modifier_groups
      .sort(item => item.sort_order)
      .map(group => {
        group.products = props.roll.available_modifiers.filter(item => item.group_id === group.id)
        return group
      })
})

function toggleWishesList () {
  isWishesListOpen.value = !isWishesListOpen.value
}

function makeOrder () {
  if(props.roll.available_modifiers?.length) return openModifiersModal()

  cartStore.addRemoveProduct(props.roll.id, 1)
}

function addRemoveModifier (groupID, id) {
  if(selectedModifier.IDs.includes(id)) {
    const foundIdIndex = selectedModifier.IDs.findIndex(item => item === id)
    const foundGroupIdIndex = selectedModifier.groupIDs.findIndex(item => item === groupID)

    selectedModifier.IDs.splice(foundIdIndex, 1)
    selectedModifier.groupIDs.splice(foundGroupIdIndex, 1)
  }
  else {
    selectedModifier.IDs.push(id)
    selectedModifier.groupIDs.push(groupID)
  }
}

function openModifiersModal () {
  isModifiersModalOpen.value = true
}

function addRemoveProduct (action: string) {
  if(action === 'plus') props.roll.quantity += 1
  else if (action === 'minus') props.roll.quantity -= 1

  cartStore.addRemoveProduct(props.roll.id, props.roll.quantity)
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
      <img
          :src="roll.photo ?? roll.image"
          alt=""
      >
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
            v-if="!roll.quantity"
            class="product-card__btn"
            @click="makeOrder"
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
    <teleport to="body">
      <modal-dialog
          v-model="isModifiersModalOpen"
          size="full"
          class="product-modifiers-modal-dialog"
          :close-icon="false"
          :back-icon="true"
      >
        <template #header>
          <h2 class="modal__title">Собери сам</h2>
          <a
              href="tel:+78006002665"
              class="modal__header__phone"
          >
            <svg data-src="/img/icons/phone.svg"/>
          </a>
        </template>
        <template #body>
          <div class="product-modifiers-modal-dialog__selected">
            <h4 class="product-modifiers-modal-dialog__selected__title">Выбрано</h4>
            <div class="product-modifiers-modal-dialog__selected__amount">{{ selectedModifier.groupIDs.length }}/{{ computedModifierGroupsIDs.length }}</div>
          </div>
          <div
              v-for="(group, groupIndex) in computedModifiers"
              class="product-modifiers-modal-dialog__items"
              :key="groupIndex"
          >
            <div class="product-modifiers-modal-dialog__items__title">
              {{ group.title }}
            </div>
            <div
                v-for="(product, productIndex) in group.products"
                class="product-card"
                :key="productIndex"
            >
              <div class="product-card__img">
                <img
                    :src="product.photo"
                    alt=""
                >
              </div>
              <div class="product-card__items">
                <p class="product-card__name">{{ product.name }}</p>
                <div class="product-card__text">
                  {{ product.info.weight }}
                  <button
                      :class="['product-card__btn', {
                        'product-card__btn--green': selectedModifier.IDs.includes(product.id)
                      }]"
                      :disabled="selectedModifier.groupIDs.includes(product.group_id) && !selectedModifier.IDs.includes(product.id)"
                      @click="addRemoveModifier(product.group_id, product.id)"
                  >
                    {{ selectedModifier.IDs.includes(product.id) ? 'Удалить' : 'Добавить' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
              class="product-modifiers-modal-dialog__submit-btn"
              :disabled="computedModifierGroupsIDs.length !== selectedModifier.groupIDs.length"
          >
            Заказать набор
          </button>
        </template>
      </modal-dialog>
    </teleport>
  </div>
</template>

<style
    lang="scss"
    src="./ProductCard.scss"
/>