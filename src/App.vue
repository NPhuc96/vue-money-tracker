<template>
  <the-navigation :switchToTransaction="switchToTransaction" />
  <router-view></router-view>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    function switchToTransaction() {
      router.push({ name: "addTransaction" });
    }
    return { switchToTransaction };
  },
};
</script>

<style></style>
