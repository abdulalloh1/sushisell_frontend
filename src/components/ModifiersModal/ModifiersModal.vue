<script lang="ts" setup>
import ModalDialog from "@/components/UI/ModalDialog/ModalDialog.vue";
import { computed, reactive, ref } from "vue";
import { useCitiesStore } from "@/store/parts/cities";
import { useCartStore } from "@/store/parts/cart";

const props = defineProps({
  modelValue: Boolean,
  roll: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const cartStore = useCartStore()
const modifierGroups = computed(() => {
  return props.roll.modifier_groups
})

const computedModelValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

const computedModifierGroupsIDs = computed(() => {
  if (!modifierGroups.value) return

  const groupIDs: number[] = []
  props.roll.available_modifiers
      .sort(item => item.sort_order)
      .map(item => {
        if (!groupIDs.includes(item.group_id)) groupIDs.push(item.group_id)
      })

  return groupIDs
})

const computedModifiers = computed(() => {
  if (!computedModifierGroupsIDs.value?.length) return [];

  return modifierGroups.value
      .sort(item => item.sort_order)
      .map(group => {
        group.selectedProducts = group.selectedProducts ? group.selectedProducts : []
        group.products = props.roll.available_modifiers.filter(item => item.group_id === group.id)
        return group
      })
})

const computedSubmitBtnDisabled = computed(() => {
  let res = false
  computedModifiers.value.map(group => {
    if(!group.is_choice_required) return false;
    if(!group.selectedProducts.length) res = true
  })

  return res
})

const computedSelectedProductsLength = computed(() => {
  return computedModifiers.value.reduce((acc, group) => {
    return acc += group.selectedProducts.length ? 1 : 0
  }, 0)
})

function addRemoveModifier (group, id) {
  if(group.selectedProducts.includes(id)) {
    const foundIdIndex = group.selectedProducts.findIndex(item => item === id)
    group.selectedProducts.splice(foundIdIndex, 1)
  }
  else {
    group.selectedProducts.push(id)
  }
}

function checkToggleBtnToDisabled(group, productId) {
  return !(
      group.is_multiple_choice && group.selectedProducts.length < 2
      ||
      !group.selectedProducts.length
      ||
      group.selectedProducts.includes(productId)
  );
}

async function submit () {
  const modifiers = computedModifiers.value.map(group => {
    return {
      group_id: group.id,
      id: group.selectedProducts[0],
      quantity: 1
    }
  })
  const modifiersIds = modifiers.map(item => item.id)
  const modifiedSelectedProducts = {
    city_id: localStorage.getItem('activeCity'),
    id: props.roll.id,
    kitchen_comments: [],
    quantity: 1,
    modifiers,
    queueKey: `${props.roll.id}_${modifiersIds.join('_')}`
  }
  await cartStore.addKitProducts(modifiedSelectedProducts)
      .finally(() => computedModelValue.value = false)
}
</script>

<template>
  <modal-dialog
      v-model="computedModelValue"
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
        <div class="product-modifiers-modal-dialog__selected__amount">{{ computedSelectedProductsLength }}/{{ computedModifierGroupsIDs?.length }}</div>
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
                        'product-card__btn--green': group.selectedProducts.includes(product.id)
                      }]"
                  :disabled="checkToggleBtnToDisabled(group, product.id)"
                  @click="addRemoveModifier(group, product.id)"
              >
                {{ group.selectedProducts.includes(product.id) ? 'Удалить' : 'Добавить' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
          class="product-modifiers-modal-dialog__submit-btn"
          :disabled="computedSubmitBtnDisabled"
          @click="submit"
      >
        Заказать набор
      </button>
    </template>
  </modal-dialog>
</template>

<style lang="scss" src="./ModifiersModal.scss" />