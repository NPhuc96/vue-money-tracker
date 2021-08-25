<template>
  <navigation></navigation>
  <main id="main">
    <router-view></router-view>
  </main>
</template>

<script>
import Navigation from "./components/layout/Navigation.vue";

export default {
  components: {
    Navigation,
  },
};
</script>

<style></style>
