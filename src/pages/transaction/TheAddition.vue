<template>
  <teleport to="body">
    <base-card class="mx-auto w-1/2" 
        >
    <base-card class="mx-auto grid grid-cols-2  text-center">
      <div class="border-r-4" :class="{'bg-green-50':isTransactionTab}">
        <router-link :to="{name : 'addTransaction'}"  @click="toggleTab">Transaction</router-link>
      </div>

      <div :class="{'bg-green-50': !isTransactionTab}">
        <router-link :to="{name : 'addGroup'}"  @click="toggleTab">Group</router-link>
      </div>   
      </base-card> 
      <router-view></router-view>
    </base-card>
  </teleport>
</template>

<script>
import {ref} from "vue";

export default {
  setup(){
    let isTransactionTab = ref(true);
    function toggleTab(){
      isTransactionTab.value = !isTransactionTab.value;
    }

    return {isTransactionTab,toggleTab};
  }
};
</script>
