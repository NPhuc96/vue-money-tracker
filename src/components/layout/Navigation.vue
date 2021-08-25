<template>
  <nav class="md:container bg-green-200 flex gap-x-8 px-12 py-2">
    <div class="">
      <a href=".">Home</a>
    </div>
    <div>
      <a href="/add">Add</a>
    </div>
    <div class="px-96 flex gap-x-8">
      <base-button type="submit">Login</base-button>
      <base-button type="submit">Register</base-button>
      <span>Guest</span>
      <base-button type="submit">Logout</base-button>
    </div>
  </nav>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: { BaseButton },
};
</script>
