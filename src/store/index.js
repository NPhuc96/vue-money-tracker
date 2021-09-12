import { createStore } from "vuex";
import authModule from "./auth/index";
import transactionModule from "./transaction/index";

const store = createStore({
  modules: {
    auth: authModule,
    transaction: transactionModule,
  },
});

export default store;
