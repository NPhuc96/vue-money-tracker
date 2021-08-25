<template>
  <div class="md:container md:mx-auto md:flex py-12">
    <add-transaction />
    <add-transaction-group />
  </div>
</template>

<script>
import AddTransaction from "../transaction/AddTransaction.vue";
import AddTransactionGroup from "../transaction/AddTransactionGroup.vue";
export default {
  components: { AddTransaction, AddTransactionGroup },
};
</script>

<style></style>
