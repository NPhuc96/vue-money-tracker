import beforeAuthHeaders from "../index";
import axios from "axios";

const API_LOCATION = process.env.VUE_APP_API_LOCATION;
const REGISTER = API_LOCATION + "/registration";
const REGISTER_CONFIRMATION = REGISTER + "/confirm?";
const LOGIN = API_LOCATION + "/login?";

export default {
  async signup(context, payload) {
    const response = await axios.post(
      REGISTER,
      {
        email: payload.email,
        password: payload.password,
        matchingPassword: payload.matchingPassword,
      },
      { beforeAuthHeaders }
    );
    const result = await response.data;
    console.log("Result from signup : " + result);
  },

  async confirmEmailToken(context, payload) {
    const params = new URLSearchParams({
      token: payload.token,
      email: payload.email,
    }).toString();

    await axios.post(REGISTER_CONFIRMATION + params, {}, { beforeAuthHeaders });
  },

  async login(context, payload) {
    const params = new URLSearchParams({
      email: payload.email,
      password: payload.password,
    }).toString();
    console.log(params);
    const response = await axios.post(
      LOGIN + params,
      {},
      { beforeAuthHeaders }
    );
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
    console.log("token : ", localStorage.getItem("token"));
  }
}
function commitUser(context, payload) {
  context.commit("setUser", {
    token: payload.token,
    userId: payload.userId,
    expiration: payload.expiration,
  });
}
