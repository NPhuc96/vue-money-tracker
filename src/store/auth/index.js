import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      userId: localStorage.getItem("userId") || null,
      token: localStorage.getItem("token") || null,
      expiration: localStorage.getItem("expiration") || null,
    };
  },
  actions,
  getters,
  mutations,
};
