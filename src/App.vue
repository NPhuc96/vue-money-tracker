<template>
  <the-navigation class="lg:w-1/3 mx-auto md:w-1/2" :switchToTransaction="switchToTransaction" 
  :switchToReport="switchToReport"/>
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
    function switchToReport(){
      router.push({name : "reports"})
    }
    return { switchToTransaction,switchToReport };
  },
};
</script>

<style></style>
