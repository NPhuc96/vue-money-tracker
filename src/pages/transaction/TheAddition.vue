<template>
  <div class="fixed md:w-1/2 lg:w-1/4 overflow-auto mx-auto left-1/3 bg-blue-100 rounded-sm text-sm">
    <div class="text-right w-full border-b-2 border-indigo-100">
      <button @click="switchToHome" class="text-red-500 font-bold mr-2">
        X
      </button>
    </div>
    <div class="mx-auto flex text-center">
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
  </div>
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
