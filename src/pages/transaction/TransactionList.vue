<template>
  <transaction-header></transaction-header>
  <base-list-card v-if="!isFetching">
    <transaction-item
      v-for="transaction in transactions.transactions"
      :key="transaction.id"
      :onDate="transaction.onDate"
      :amount="transaction.amount"
      :group="transaction.groups.name"
      :note="transaction.note"
    ></transaction-item>
  </base-list-card>
  <p v-if="!isFetching" class="md:container mx-auto">{{ countMessage }}</p>
  <pagination v-if="!isFetching" :pageInfo="transactions.pageInfo"></pagination>
</template>

<script>
import TransactionHeader from "../../components/transaction/TransactionHeader.vue";
import TransactionItem from "../../components/transaction/TransactionItem.vue";
import { computed } from "vue";
import Pagination from "../../components/transaction/Pagination.vue";
export default {
  props: ["transactions", "isFetching"],
  components: { TransactionHeader, TransactionItem, Pagination },
  setup(props) {
    const countMessage = computed(
      () =>
        "Show from " +
        from() +
        " to " +
        to() +
        " of " +
        totalEls() +
        " transactions"
    );
    function from() {
      return props.transactions.pageInfo.from;
    }
    function to() {
      return props.transactions.pageInfo.to;
    }
    function totalEls() {
      return props.transactions.pageInfo.totalElements;
    }

    return { countMessage };
  },
};
</script>

<style></style>
