<template>
  <main id="main">
    <transaction-list
      :transactions="transactions"
      :isFetching="isFetching"
    ></transaction-list>
  </main>
</template>

<script>
import TransactionList from "./transaction/TransactionList.vue";
import { useStore } from "vuex";
import { reactive } from "vue";
import { computed } from "@vue/reactivity";
export default {
  props: ["isLoggedIn"],
  components: { TransactionList },
  setup(props) {
    const store = useStore();
    const pageRequest = reactive({
      userId: store.getters.userId,
      page: null,
      pageSize: null,
    });
    function getTransaction() {
      if (props.isLoggedIn) {
        store.dispatch("getTransactions", pageRequest);
      }
    }
    getTransaction();
    let transactions = computed(() => store.getters.transactions);
    let isFetching = computed(function () {
      if (transactions.value) {
        return false;
      }
      return true;
    });
    return { transactions, isFetching };
  },
};
</script>

<style></style>
