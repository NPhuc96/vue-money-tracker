<template>
  <div class="md:container md:mx-auto md:flex py-12">
    <add-transaction />
    <add-transaction-group />
  </div>
  <div class="md:container mx-auto" v-if="tempTransactions.length > 0">
    <transaction-list-header />
    <the-transaction
      v-for="temp in tempTransactions"
      :key="temp.id"
      :time="temp.time"
      :group="temp.transactionGroup.name"
      :note="temp.note"
      :money="temp.money"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddTransaction from "../transaction/AddTransaction.vue";
import AddTransactionGroup from "../transaction/AddTransactionGroup.vue";
import TheTransaction from "../transaction/TheTransaction.vue";
import TransactionListHeader from "../transaction/TransactionListHeader.vue";
export default {
  components: {
    AddTransaction,
    AddTransactionGroup,
    TheTransaction,
    TransactionListHeader,
  },
  computed: {
    ...mapGetters({
      tempTransactions: "getTempTransaction",
    }),
  },
};
</script>

<style></style>
