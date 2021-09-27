<template>
  <base-form-card class="border-2 border-blue-200 my-16 mx-auto">
    <div class="mx-auto flex text-center border-b-2 border-blue-200">
      <div
        class="w-1/2"
        :class="{ 'bg-indigo-100 ring-2 ring-indigo-200': isLoginTab }"
      >
        <router-link :to="{ name: 'login' }">Login</router-link>
      </div>
      <div
        class="w-1/2"
        :class="{ 'bg-indigo-100 ring-2 ring-indigo-200': !isLoginTab }"
      >
        <router-link :to="{ name: 'signup' }">Register</router-link>
      </div>
    </div>
    <router-view></router-view>
  </base-form-card>
</template>

<script>
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
    setup(){
        const route = useRoute();
        let isLoginTab = computed(()=> route.name=="login");

        return {isLoginTab};
    }
};
</script>

<style></style>
