<template>
  <the-navigation :isLoggedIn="isLoggedIn"></the-navigation>
  <router-view :isLoggedIn="isLoggedIn" ></router-view>
</template>

<script>
import { useStore } from "vuex";
import {computed} from "vue";
export default {
  setup() {
    const store = useStore();
    
    const isLoggedIn = computed(()=>store.getters.isAuthenticated);  
  
    return {isLoggedIn}
  },
  
};
</script>

<style></style>
