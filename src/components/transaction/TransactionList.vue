<template>
  <base-list-card v-if="!isFetching">
    <transaction-item
      @updateTransaction="$emit('updateTransaction', $event)"
      @updateGroup="$emit('updateGroup', $event)"
      @getTransactionId="$emit('getTransactionId', $event)"
      @getGroupId="$emit('getGroupId', $event)"
      v-for="transaction in transactions.transactions"
      :key="transaction.id"
      :transactionId="transaction.id"
      :onDate="transaction.onDate"
      :amount="transaction.amount"
      :group="transaction.groups"
      :note="transaction.note || ''"
    />
    <pagination
      :key="key"
      v-if="!isFetching"
      :pageInfo="transactions.pageInfo"
    />
  </base-list-card>
</template>

<script>
import TransactionItem from "./TransactionItem.vue";
import Pagination from "./Pagination.vue";

export default {
  props: ["transactions", "isFetching", "key"],
  emits: ["updateTransaction", "updateGroup", "getTransactionId", "getGroupId"],
  components: { TransactionItem, Pagination },
  setup() {},
};
</script>

<style></style>
