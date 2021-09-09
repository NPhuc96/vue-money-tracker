import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/pages/Home.vue";
import Login from "./components/pages/Login.vue";
import Signup from "./components/pages/SignUp.vue";
import SignupConfirm from "./components/pages/SignUpConfirm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "home" },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/auth/confirm", component: SignupConfirm },
  ],
});
export default router;
