<template>
  <div class="flex  w-2/3 mx-auto mt-3 border-b-2 border-blue-100 ">
    <div class="mt-3 pl-4 w-1/4">
      <router-link :to="{ name: 'home' }" class="w-1/3"
        ><img src="../../assets/home.svg"
      /></router-link>
    </div>
    <div class=" mt-3 pl-4 w-1/2" v-if="isLoggedIn">
      <button @click="switchToReport" class="mr-5">
        <img src="../../assets/pie_chart.svg"/>
      </button>
      <button @click="switchToTransaction" class="ml-5">
        <img src="../../assets/add.svg" />
      </button>
      
    </div>
    <div class="mt-3 pl-4">
      <button v-if="isLoggedIn" @click="logout">
        <img src="../../assets/logout.svg" />
      </button>
      <router-link :to="{ name: 'login' }" v-else
        ><img src="../../assets/login.svg"
      /></router-link>
    </div>
  </div>

</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["switchToTransaction","switchToReport"],

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
