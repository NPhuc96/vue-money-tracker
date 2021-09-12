import axios from "axios";

const customAxios = axios.create();
customAxios.defaults.baseURL = process.env.VUE_APP_API_LOCATION;
customAxios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8",
  Accept: "application/json",
};

customAxios.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  request.headers.Authorization = token ? "Bearer " + token : "";
  return request;
});

export default customAxios;
