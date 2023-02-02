<script
    lang="ts"
    setup
>
import { ref } from 'vue';
import ModalDialog from '@/components/UI/ModalDialog/ModalDialog.vue';

const singleSale = ref(false)

function openSingleSale() {
  return singleSale.value = !singleSale.value
}
</script>

<template>
  <div class="sales">
    <div class="sales-wrapper">
      <div class="sales__img">
        <img
            src="/img/roll-sale.jpeg"
            alt=""
        >
      </div>
      <div class="sales__texts">
        <h6 class="sales__title">Отвал башки</h6>
        <p class="sales__text">Новый набор "Отвал башки" уже доступен к заказу!</p>
        <p class="sales__text">
          Расскажем о преимуществах нового набора: <br/>
          - в составе только любимые роллы из меню; <br/>
          - выгода при покупке набора, а не отдельных позиций - 375₽; <br/>
          - доступен к заказу не пару дней в неделю, а весь ноябрь.
        </p>
        <p class="sales__text">Закажите набор "Отвал башки" за 1099₽, вместо 1474₽.</p>
        <p class="sales__text">*Скидки и акции не суммируются</p>
      </div>
      <div class="sales__footer  border">
        <div class="sales__footer__date">01.11.2022</div>
        <button
            class="sales__footer__btn"
            @click="openSingleSale"
        >
          Подробнее
        </button>
      </div>
      <div class="sales__single">
        <modal-dialog
            v-model="singleSale"
            :close-icon="false"
            size="full"
        >
          <template #header>
            <div class="modal__items">
              <button
                  class="modal__icon"
                  @click="openSingleSale"
              >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M17.0156 8.01562V9.98438H4.82812L10.4062 15.6094L9 17.0156L0.984375 9L9 0.984375L10.4062 2.39062L4.82812 8.01562H17.0156Z"
                      fill="white"
                  />
                </svg>
              </button>
              <h2 class="modal__header__title">Подробнее об акции</h2>
            </div>
            <a
                href="tel:+78006002665"
                class="modal__phone"
            >
              <svg data-src="/img/icons/phone.svg"/>
            </a>
          </template>
          <template #body>
            <div class="modal-wrapper">
              <div class="modal__img">
                <img
                    src="/img/roll-sale.jpeg"
                    alt=""
                >
              </div>
              <div class="modal__texts">
                <h6 class="modal__title">Отвал башки</h6>
                <p class="modal__text">Новый набор "Отвал башки" уже доступен к заказу!</p>
                <p class="modal__text">
                  Расскажем о преимуществах нового набора: <br/>
                  - в составе только любимые роллы из меню; <br/>
                  - выгода при покупке набора, а не отдельных позиций - 375₽; <br/>
                  - доступен к заказу не пару дней в неделю, а весь ноябрь.
                </p>
                <p class="modal__text">Закажите набор "Отвал башки" за 1099₽, вместо 1474₽.</p>
                <p class="modal__text">*Скидки и акции не суммируются</p>
              </div>
              <div class="sales__footer">
                <div class="sales__footer__date">Дата публикации: 01.11.2022</div>
              </div>
              <div class="modal__product">
                <p class="modal__product__title">Товары из акции</p>
                <div class="modal__product__items">
                  <div class="modal__product__img">
                    <img
                        src="/img/roll-sale.jpeg"
                        alt=""
                    >
                    <img
                        src="/img/icons/hot.svg"
                        alt=""
                        class="icon"
                    >
                    <img
                        src="/img/icons/sale.svg"
                        alt=""
                        class="icon sale"
                    >
                  </div>
                  <p class="modal__product__text">Отвал башки</p>
                </div>
              </div>
            </div>
          </template>
        </modal-dialog>
      </div>
    </div>
  </div>
</template>