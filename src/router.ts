import { createRouter, createWebHistory } from "vue-router";

import MainPage from './views/Main/MainPage.vue';
import AuthPage from './views/Auth/AuthPage.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Main",
            component: MainPage,
        },
        {
            path: "/auth",
            name: "AuthPage",
            component: AuthPage,
        },
    ],
});
