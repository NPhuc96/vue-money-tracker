import beforeAuthHeaders from "../index";
import axios from "axios";

const REGISTER_API_LOCATION =
  process.env.VUE_APP_API_LOCATION + "/registration";
const REGISTER_CONFIRMATION_API_LOCATION = REGISTER_API_LOCATION + "/confirm?";

export default {
  async signup(context, payload) {
    const response = await axios.post(
      REGISTER_API_LOCATION,
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

    await axios
      .post(
        REGISTER_CONFIRMATION_API_LOCATION + params,
        {},
        { beforeAuthHeaders }
      )
      .then((result) => console.log(result))
      .catch((err) => {
        throw new Error(err.response.data.errorMessage);
      });
  },
};
