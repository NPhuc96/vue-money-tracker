import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Authentication from "./pages/auth/Authentication.vue";
import Login from "./pages/auth/Login.vue";
import Signup from "./pages/auth/SignUp.vue";
import Confirmation from "./pages/auth/Confirmation.vue";
import AddTransaction from "./pages/transaction/AddTransaction.vue";
import AddGroup from "./pages/transaction/AddGroup.vue";
import moment from "moment-timezone";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
      children: [
        {
          path: "add/transaction",
          component: AddTransaction,
          name: "addTransaction",
        },
        { path: "add/group", component: AddGroup, name: "addGroup" },
      ],
    },
    {
      path: "/auth/",
      component: Authentication,
      name: "auth",
      children: [
        { path: "login", component: Login, name: "login" },
        { path: "signup", component: Signup, name: "signup" },
      ],
    },
    {
      path: "/auth/confirm",
      component: Confirmation,
      name: "confirmation",
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (!to.path.includes("auth") && (!isTimeValid() || !isAuthenticated())) {
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
  return moment.tz(date, "yyyy/MM/DD HH:mm:ss", "Asia/Bangkok");
};
export default router;
