<template>
  <the-navigation
    class="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
    :switchToTransaction="switchToTransaction"
    :switchToReport="switchToReport"
  />
  <router-view />
  <the-footer />
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    function switchToTransaction() {
      router.push({ name: "addTransaction" });
    }
    function switchToReport() {
      router.push({ name: "reports" });
    }
    return { switchToTransaction, switchToReport };
  },
};
</script>

<style></style>
