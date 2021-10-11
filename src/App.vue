<template>
  <the-navigation
    class="w-full sm:w-90 md:w-9/12 lg:w-1/2 xl:w-45"
    :switchToTransaction="switchToTransaction"
    :switchToReport="switchToReport"
  />
  <router-view />
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
