<template>
  <base-card class="mx-auto w-2/5 mt-10">
    <div class="font-bold text-lg w-2/5 mx-auto py-4">Sign Up Form</div>
    <form class="w-2/3 mx-auto">
      <base-input type="email" placeHolder="enter email" />

      <base-input type="password" placeHolder="enter password" />
      <base-input type="password" placeHolder="re-enter password" />
      <div class="py-3 mx-auto w-5/6">
        <base-button class="px-14">Sign Up</base-button>
      </div>
    </form>

    <div class="w-1/4 mx-72">
      <router-link class="text-center hover:text-green-400" to="/login"
        >Login</router-link
      >
    </div>
  </base-card>
</template>

<script>
export default {};
</script>

<style></style>
