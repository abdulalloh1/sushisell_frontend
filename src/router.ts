import { createRouter, createWebHistory } from "vue-router";

import MainPage from './views/Main.vue';
import AuthPage from './views/Auth/AuthLogin.vue';
import Sales from "./views/Sales.vue";

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
        {
            path: "/sales",
            name: "Sales",
            component: Sales,
        }
    ],
});
