<template>
  <base-backdrop />
  <base-form-card
    class="
      fixed
      z-50
      w-full
      sm:w-9/12
      md:w-6/12
      lg:w-4/12
      xl:w-3/12  
      top-20
      left-4
      md:left-32
      lg:left-72
      xl:left-35
      overflow-auto

    "
  >
    <div class="text-right w-full border-2 border-indigo-200">
      <button @click="switchToHome" class="font-medium mr-2">
        x
      </button>
    </div>
    <div class="mx-auto flex text-center border-b-2 border-blue-200">
      <div
        class="w-1/2"
        :class="{ 'bg-indigo-100 ring-2 ring-indigo-200': isTransactionTab }"
      >
        <router-link :to="{ name: 'addTransaction' }">Transaction</router-link>
      </div>
      <div
        class="w-1/2"
        :class="{ 'bg-indigo-100 ring-2 ring-indigo-200': !isTransactionTab }"
      >
        <router-link :to="{ name: 'addGroup' }">Group</router-link>
      </div>
    </div>
    <router-view></router-view>
  </base-form-card>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  props: ["switchToHome"],
  setup() {
    const route = useRoute();
    let isTransactionTab = computed(() => route.name == "addTransaction");

    return { isTransactionTab };
  },
};
</script>
