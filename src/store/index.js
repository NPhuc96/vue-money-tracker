import { createStore } from "vuex";
import authModule from "./auth/index";
import transactionModule from "./transaction/index";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


const store = createStore({
  modules: {
    auth: authModule,
    transaction: transactionModule,
  },
  state() {
    return {
      key: 0
    };
  },
  actions,
  getters,
  mutations,
});

export default store;
