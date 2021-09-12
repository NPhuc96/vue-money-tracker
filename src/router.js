import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Login from "./pages/auth/Login.vue";
import Signup from "./pages/auth/SignUp.vue";
import SignupConfirm from "./pages/auth/SignUpConfirm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "home" },
    { path: "/login", component: Login, name: "login" },
    { path: "/signup", component: Signup },
    { path: "/auth/confirm", component: SignupConfirm },
  ],
});
export default router;
