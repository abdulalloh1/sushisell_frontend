import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import { pinia } from "@/store";

createApp(App)
    .use(router)
    .use(pinia)
    .mount("#app");
