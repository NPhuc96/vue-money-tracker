import { createApp } from "vue";
import App from "./App.vue";

import TheNavigation from "./components/layout/TheNavigation.vue";

import BaseCard from "./components/UI/BaseCard.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseInput from "./components/UI/BaseInput.vue";

import store from "./store/index";
import router from "./router";

import "./assets/tailwind.css";

const app = createApp(App);

app.component("the-navigation", TheNavigation);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-input", BaseInput);

app.use(router);
app.use(store);

app.mount("#app");
