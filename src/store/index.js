import { createStore } from "vuex";
import authModule from "./auth/index";

export const beforeAuthHeaders = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const store = createStore({
  modules: {
    auth: authModule,
  },
});

export default store;
