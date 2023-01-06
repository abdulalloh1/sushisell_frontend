import { createRouter, createWebHistory } from "vue-router";

import Main from './views/Main.vue';
import AuthLogin from './views/Auth/AuthLogin.vue'
import AuthRegistration from "@/views/Auth/AuthRegistration.vue";
import Contacts from "@/views/Contacts.vue";
import Cart from "@/views/Cart.vue";
import Sales from "@/views/Sales.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Main",
            component: Main,
        },
        {
            path: "/contacts",
            name: "Contacts",
            component: Contacts,
        },
        {
            path: "/sales",
            name: "Sales",
            component: Sales,
        },
        {
            path: "/cart",
            name: "Cart",
            component: Cart,
        },
        {
            path: "/login",
            name: "Login",
            component: AuthLogin,
        },
        {
            path: "/registration",
            name: "Registration",
            component: AuthRegistration,
        },
    ],
});
