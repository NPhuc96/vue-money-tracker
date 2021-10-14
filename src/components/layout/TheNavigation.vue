<template>
  <div
    class="flex gap-4 sm:gap-7 md:gap-12 lg:gap-16 xl:gap-20 mx-auto border-b"
  >
    <div class="ml-2">
      <button @click="switchToHome">
        <base-svg :isCurrentRoute="isHome" :viewBox="'0 -3 24 24'">
          <path :d="home" />
        </base-svg>
      </button>
    </div>
    <div
      class="flex gap-4 sm:gap-7 md:gap-10 lg:gap-12 xl:gap-20"
      v-if="isLoggedIn"
    >
      <button @click="switchToReport">
        <base-svg :isCurrentRoute="isReport" :viewBox="'0 -1 24 24'">
          <path :d="report" />
        </base-svg>
      </button>
      <button @click="switchToTransaction">
        <base-svg :isCurrentRoute="isAdd" :viewBox="'0 0 24 24'">
          <path :d="add" />
        </base-svg>
      </button>
    </div>
    <div>
      <button v-if="isLoggedIn" @click="logout">
        <base-svg :viewBox="'0 -1 24 24'">
          <path :d="signOut" />
        </base-svg>
      </button>
      <router-link :to="{ name: 'login' }" v-else
        ><base-svg :isCurrentRoute="isLogin" :viewBox="'0 -1 24 24'">
          <path :d="signIn" /> </base-svg
      ></router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  homePath,
  reportPath,
  addPath,
  signInPath,
  signOutPath,
} from "../../common/SvgPath";

export default {
  props: ["switchToTransaction", "switchToReport", "switchToHome"],

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const home = ref(homePath);
    const report = ref(reportPath);
    const add = ref(addPath);
    const signIn = ref(signInPath);
    const signOut = ref(signOutPath);
    const isLoggedIn = computed(() => store.getters.isAuthenticated);
    const isHome = computed(() => route.name == "home");
    const isLogin = computed(() => route.name == "login");
    const isAdd = computed(
      () => route.name == "addTransaction" || route.name == "addGroup"
    );
    const isReport = computed(() => route.name == "reports");
    function logout() {
      router.push({ name: "login", query: {} });
      store.dispatch("logout");
    }
    return {
      isLoggedIn,
      logout,
      isHome,
      isReport,
      isLogin,
      isAdd,
      home,
      report,
      add,
      signIn,
      signOut,
    };
  },
};
</script>


