<script lang="ts" setup>
import { ref } from "vue";

const routes = ref([
  {
    routeName: 'Main',
    title: 'Меню',
    icon: '/img/icons/home.svg'
  },
  {
    routeName: '',
    title: 'Профиль',
    icon: '/img/icons/profile.svg'
  },
  {
    routeName: 'Main',
    title: 'Акции',
    icon: '/img/icons/gift.svg'
  },
  {
    routeName: 'Main',
    title: 'Контакты',
    icon: '/img/icons/contacts.svg'
  },
  {
    routeName: 'Main',
    title: 'Корзина',
    icon: '/img/icons/cart.svg'
  }
])
</script>

<template>
  <div class="app-footer">
    <div class="app-footer-wrapper">
      <router-link
          v-for="(route, index) in routes"
          :key="index"
          :to="{
            name: route.routeName
          }"
          class="app-footer__btn"
          active-class="app-footer__btn--active"
      >
        <div class="app-footer__home">
          <svg :data-src="route.icon"/>
        </div>
        <p class="app-footer__text">{{ route.title }}</p>
      </router-link>
    </div>
  </div>
</template>

<style
    lang="scss"
    src="./AppFooter.scss"
/>