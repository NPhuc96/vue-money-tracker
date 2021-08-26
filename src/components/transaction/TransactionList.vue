<template>
  <transaction-list-header />
  <the-transaction
    v-for="transaction in transactions.transactions"
    :key="transaction.id"
    :time="transaction.time"
    :group="transaction.transactionGroup.name"
    :note="transaction.note"
    :money="transaction.money"
  ></the-transaction>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TheTransaction from "./TheTransaction.vue";
import TransactionListHeader from "./TransactionListHeader.vue";

export default {
  components: { TransactionListHeader, TheTransaction },
  methods: {
    ...mapActions(["fetchTransactions"]),
  },
  computed: {
    ...mapGetters({
      transactions: "getTransactions",
    }),
  },
  created() {
    this.fetchTransactions();
  },
};
</script>

<style scoped></style>
