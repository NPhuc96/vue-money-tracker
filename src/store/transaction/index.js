import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      transactions: null,
      transaction: null,
      groups: [],
      group: null,
      report : null,
    };
  },
  actions,
  getters,
  mutations,
};
