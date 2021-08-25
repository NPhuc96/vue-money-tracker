import { createApp } from "vue";

import App from "./App.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import store from "./store/index";
import router from "./router";

const app = createApp(App);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);

app.use(router);
app.use(store);
app.mount("#app");
