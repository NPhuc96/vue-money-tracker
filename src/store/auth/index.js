import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      userId: localStorage.getItem("user_id"),
      token: localStorage.getItem("token"),
      expiration: localStorage.getItem("expiration"),
    };
  },
  actions,
  getters,
  mutations,
};
