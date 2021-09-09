<template>
  <div class="md:contrainer border-b border-green-100">
    <ul class="flex">
      <li class="m-3">
        <router-link to="/" class="text-lg font-bold">MoneyTracker</router-link>
      </li>

      <li class="m-3">
        <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
        <a v-else>Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    let isLoggedIn = computed(function () {
      return store.getters.isAuthenticated;
    });
    return { isLoggedIn };
  },
};
</script>

<style></style>
