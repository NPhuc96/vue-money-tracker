import { createStore } from "vuex";
import transaction from "./transaction/index";

const store = createStore({
  modules: {
    transaction,
  },
});

export default store;
