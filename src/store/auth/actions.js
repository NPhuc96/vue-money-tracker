import axios from "../../api/Client";

const REGISTER = "/registration";
const REGISTER_CONFIRMATION = REGISTER + "/confirm?";
const LOGIN = "/login?";

export default {
  async signup(context, payload) {
    const response = await axios.post(REGISTER, {
      email: payload.email,
      password: payload.password,
      matchingPassword: payload.matchingPassword,
    });
    const result = await response.data;
    console.log("Result from signup : " + result);
  },

  async confirmEmailToken(context, payload) {
    const params = new URLSearchParams({
      token: payload.token,
      email: payload.email,
    }).toString();

    await axios.post(REGISTER_CONFIRMATION + params, {});
  },

  async login(context, payload) {
    const params = new URLSearchParams({
      email: payload.email,
      password: payload.password,
    }).toString();
    console.log(params);
    const response = await axios.post(LOGIN + params, {});
    const result = await response.data;
    setLocalStorage(result);
    commitUser(context, payload);
  },
};
function setLocalStorage(payload) {
  if (payload != null) {
    localStorage.setItem("token", payload.token);
    localStorage.setItem("user_id", payload.userId);
    localStorage.setItem("expiration", payload.expiration);
  }
}
function commitUser(context, payload) {
  context.commit("setUser", {
    token: payload.token,
    userId: payload.userId,
    expiration: payload.expiration,
  });
}
