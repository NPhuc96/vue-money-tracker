<template>
  <div class="md:contrainer border-b border-green-100">
    <ul class="flex">
      <li class="m-3">
        <router-link :to="{name:'home'}" class="text-lg font-bold">MoneyTracker</router-link>
      </li>
      <li class="m-3">
        <base-button @click="showAddition">Add</base-button>
      </li>

      <li class="m-3">
        <router-link :to="{name : 'login'}" v-if="!isLoggedIn">Login</router-link>
        <base-button v-else-if="isLoggedIn" @click="logout">Logout</base-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  props : ["showAddition"],
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLoggedIn = computed(() => store.getters.isAuthenticated);

    function logout() {
      store.dispatch("logout");
      router.push({ name: "login",query:{} });
    }
    return { isLoggedIn, logout };
  },
};
</script>

<style></style>
