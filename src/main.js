import { createApp } from "vue";
import App from "./App.vue";
import TheNavigation from "./components/layout/TheNavigation.vue";
import BaseAnchor from "./components/UI/BaseAnchor.vue";
import BaseListCard from "./components/UI/BaseListCard.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseInput from "./components/UI/BaseInput.vue";
import BaseBackdrop from "./components/UI/BaseBackdrop.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import BaseFormCard from "./components/UI/BaseFormCard.vue";

import store from "./store/index";
import router from "./router";

import "./assets/tailwind.css";

const app = createApp(App);
app.component("the-navigation", TheNavigation);
app.component("base-anchor", BaseAnchor);
app.component("base-list-card", BaseListCard);
app.component("base-button", BaseButton);
app.component("base-input", BaseInput);
app.component("base-backdrop", BaseBackdrop);
app.component("base-dialog", BaseDialog);
app.component("base-form-card", BaseFormCard);

app.use(router);
app.use(store);
app.mount("#app");
