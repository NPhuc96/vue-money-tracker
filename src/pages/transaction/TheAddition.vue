<template>
  <base-backdrop />
  <base-form-card
    class="
      fixed
      z-50
      overflow-auto
      top-16
      sm:left-15
      md:left-25
      lg:left-1/3
      xl:left-35
    "
  >
    <div class="text-right w-full border-2 border-indigo-200">
      <button @click="switchToHome" class="text-red-400 font-medium mr-2">
        Close
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
