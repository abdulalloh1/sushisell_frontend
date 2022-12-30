import { createRouter, createWebHistory } from "vue-router";

import MainPage from './views/Main/MainPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Main",
      component: MainPage,
    },
  ],
});
