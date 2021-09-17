import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Login from "./pages/auth/Login.vue";
import Signup from "./pages/auth/SignUp.vue";
import SignupConfirm from "./pages/auth/SignUpConfirm.vue";
import moment from "moment-timezone";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "home"},
    { path: "/login", component: Login, name: "login" },
    { path: "/signup", component: Signup },
    { path: "/auth/confirm", component: SignupConfirm },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.name !== "login" &&( !isTimeValid()  || !isAuthenticated())) {
    next({ name: "login" });
  } else next();
});

const isAuthenticated = () => {
  return localStorage.getItem("token");
};
const isTimeValid = () => {
  let expiration = localStorage.getItem("expiration");
  if (expiration) {
    return compareTime(expiration);
  }
};
const compareTime = (date) => {
  return parseTime(date).isAfter(new Date());
};

const parseTime = (date) => {
  return  moment.tz(date, "yyyy/MM/DD HH:mm:ss", "Asia/Bangkok");
};
export default router;
