<template>
  <the-navigation></the-navigation>
  <home></home>
</template>

<script>
import { onBeforeUnmount } from "@vue/runtime-core";
import Home from "./components/pages/Home.vue";
export default {
  components: { Home },
  setup() {
    localStorage.clear();
    onBeforeUnmount(function () {
      localStorage.clear();
    });
  },
};
</script>

<style></style>
