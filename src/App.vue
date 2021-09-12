<template>
  <the-navigation :isLoggedIn="isLoggedIn"></the-navigation>
  <router-view :isLoggedIn="isLoggedIn"></router-view>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    //localStorage.clear();
    const store = useStore();
    let isLoggedIn = computed(function () {
      return store.getters.isAuthenticated;
    });

    return { isLoggedIn };
  },
};
</script>

<style></style>
