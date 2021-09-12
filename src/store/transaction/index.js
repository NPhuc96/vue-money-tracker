import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      transactions: null,
      groups: [],
    };
  },
  actions,
  getters,
  mutations,
};
