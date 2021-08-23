<template>
 <navigation></navigation> 
  <transaction-list></transaction-list>
</template>

<script>
import Navigation from "./components/layout/Navigation.vue";
import TransactionList from "./pages/transaction/TransactionList.vue";

export default {
  components : {
    Navigation,
    TransactionList
  }
}
</script>

<style>

</style>