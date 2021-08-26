import { createApp } from "vue";

import App from "./App.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import BaseInput from "./components/UI/BaseInput.vue";
import BaseH from "./components/UI/BaseH.vue";
import store from "./store/index";
import router from "./router";
import "./assets/tailwind.css";

const app = createApp(App);
app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-input", BaseInput);
app.component("base-h", BaseH);

app.use(router);
app.use(store);
app.mount("#app");
