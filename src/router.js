import { createRouter, createWebHistory } from 'vue-router';
import Home from "./components/pages/Home.vue";
import Login from "./components/pages/Login.vue";
import Signup from "./components/pages/SignUp.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path :'/signup', component : Signup },
  ]
})
export default router;