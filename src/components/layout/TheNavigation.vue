<template>
  <div class="md:contrainer border-b border-green-100">
    <ul class="flex">
      <li class="m-3">
        <router-link to="/" class="text-lg font-bold">MoneyTracker</router-link>
      </li>

      <li class="m-3">
        <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
        <base-button v-else-if="isLoggedIn">Logout</base-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isLoggedIn"],
  setup() {},
};
</script>

<style></style>
