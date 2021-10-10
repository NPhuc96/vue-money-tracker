import axios from "../../api/Client";

const REGISTER = "/registration";
const REGISTER_CONFIRMATION = "/registration/confirm";
const LOGIN = "/login";
const REQUEST = "/password/request";
const CONFIRM = "/password/confirm";
const RESET = "password/reset";

export default {
  async signup(context, payload) {
    await axios.post(REGISTER, {
      email: payload.email,
      password: payload.password,
      matchingPassword: payload.matchingPassword,
    });
  },

  async confirmEmailToken(context, payload) {
    await axios.post(
      REGISTER_CONFIRMATION,
      {},
      { params: { token: payload.token, userId: payload.userId } }
    );
  },

  async login(context, payload) {
    const login = {
      email: payload.email,
      password: payload.password,
    };
    const response = await axios.post(LOGIN, {}, { params: login });
    const result = await response.data;
    setLocalStorage(result);
    setAuthentication(context, payload);
    pushHome(payload.router, response);
  },
  logout(context) {
    unsetAuthentication(context);
    localStorage.clear();
  },
  async request(context, email) {
    const response = await axios.post(
      REQUEST,
      {},
      { params: { email: email } }
    );
    const result = response.data;
  },
  async confirm(context, payload) {
    const response = await axios.post(
      CONFIRM,
      {},
      { params: { email: payload.email, code: payload.code } }
    );
    const result = response.data;
  },
  async changePassword(context, payload) {
    const response = await axios.post(RESET, {
      email: payload.email,
      newPassword: payload.password,
    });
    const result = response.data;
  },
};
function pushHome(router, response) {
  if (response.status === 200) {
    router.push({ name: "home" });
  }
}
function setLocalStorage(payload) {
  if (payload != null) {
    localStorage.setItem("token", payload.token);
    localStorage.setItem("user_id", payload.userId);
    localStorage.setItem("expiration", payload.expiration);
  }
}
function setAuthentication(context) {
  context.commit("setUser", {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("user_id"),
    expiration: localStorage.getItem("expiration"),
  });
}
function unsetAuthentication(context) {
  context.commit("setUser", {
    token: null,
    userId: null,
    expiration: null,
  });
}
