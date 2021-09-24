<template>
  <div class="flex w-2/3 mx-auto mt-2 border-b-2 border-blue-100">
    <div class="pl-4">
      <router-link :to="{ name: 'home' }" class="w-1/3"
        ><img src="../../assets/expense.png" width="110"
      /></router-link>
    </div>
    <div class="mt-3 pl-8">
      <button @click="switchToTransaction"><img src="../../assets/add.svg" /></button>
    </div>
    <div class="ml-auto mt-3 mr-12">
      <button v-if="isLoggedIn" @click="logout">
        <img src="../../assets/logout.svg" />
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  props: ["switchToTransaction"],
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLoggedIn = computed(() => store.getters.isAuthenticated);

    function logout() {
      store.dispatch("logout");
      router.push({ name: "login", query: {} });
    }
    return { isLoggedIn, logout };
  },
};
</script>

<style></style>
