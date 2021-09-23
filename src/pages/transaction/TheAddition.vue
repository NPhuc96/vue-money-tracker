<template>
    <div
      class="
        fixed
        w-2/5
        overflow-auto
        top-16
        left-1/4
        bg-blue-100
        rounded-sm
      "
    >
      <div class="text-right w-full border-b-2 border-indigo-100">
        <button  @click="showAddition" class="text-red-500 font-bold mr-2">X</button>
      </div>
      <div class="mx-auto flex text-center">
        <div
          class="w-1/2"
          :class="{ 'bg-indigo-100 ring-2 ring-indigo-200': isTransactionTab }"
        >
          <router-link :to="{ name: 'addTransaction' }" @click="toggleTab"
            >Transaction</router-link
          >
        </div>
        <div
          class="w-1/2"
          :class="{ 'bg-indigo-100 ring-2 ring-indigo-200': !isTransactionTab }"
        >
          <router-link :to="{ name: 'addGroup' }" @click="toggleTab"
            >Group</router-link
          >
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
  props : ["showAddition"],
  setup() {
    let isTransactionTab = ref(true);
    function toggleTab() {
      isTransactionTab.value = !isTransactionTab.value;
    }

    return { isTransactionTab, toggleTab };
  },
};
</script>
