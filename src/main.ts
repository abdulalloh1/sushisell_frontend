import { createApp } from "vue";
import { router } from "./router";
import { pinia } from "@/store";
import UUID from "vue3-uuid";
import App from "./App.vue";

createApp(App)
    .use(router)
    .use(pinia)
    .use(UUID)
    .mount("#app");
