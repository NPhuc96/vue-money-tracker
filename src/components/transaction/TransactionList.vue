<template>
  <base-list-card v-if="!isFetching" >
    <transaction-item 
      @showUpdate="$emit('showUpdate',$event)"
      v-for="transaction in transactions.transactions"
      :key="transaction.id"
      :id ="transaction.id"
      :onDate="transaction.onDate"
      :amount="transaction.amount"
      :group="transaction.groups.name"
      :note="transaction.note || ''"
    ></transaction-item>
  </base-list-card>
  <div class="md:container mx-auto md:flex">
    <div class="w-2/5">
      <p v-if="!isFetching">{{ countMessage }}</p>
    </div>
    <pagination
      v-if="!isFetching"
      :pageInfo="transactions.pageInfo"
      class="border-2"
    ></pagination>
  </div>
</template>

<script>
import TransactionItem from "./TransactionItem.vue";
import Pagination from "./Pagination.vue";
import { computed } from "vue";

export default {
  props: ["transactions", "isFetching"],
  emits : ["showUpdate"],
  components: {  TransactionItem, Pagination },
  setup(props) {
    const countMessage = computed(
      () =>
        from.value +
        " to " +
        to.value +
        " of " +
        totalEls.value +
        " transactions"
    );
    let from = computed(() => {
      return props.transactions.pageInfo.from;
    });
    let to = computed(() => {
      return props.transactions.pageInfo.to;
    });
    let totalEls = computed(() => {
      return props.transactions.pageInfo.totalElements;
    });

    return { countMessage };
  },
};
</script>

<style></style>
