<template>
  <the-navigation></the-navigation>
  <main id="main" :key="key">
    <transaction-list
      :transactions="transactions"
      :isFetching="isFetching"
    ></transaction-list>
  </main>
</template>

<script>
import TransactionList from "./transaction/TransactionList.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { reactive, computed, watch } from "vue";

export default {
  components: { TransactionList },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    
    const page = computed(() => route.query.page || 1);
    const size = computed(() => route.query.size || 15);
    let transactions = computed(() => 
   
       store.getters.transactions
      );
    let key = computed(()=>store.getters.key);  
    const pageRequest = reactive({
      page: page,
      size: size,
    });
    watch((pageRequest,key), () => {
      
      getTransaction();
    });
    getTransaction();
    function getTransaction() {
      router.replace({ query: pageRequest });
      store.dispatch("getTransactions", pageRequest);
    }

    let isFetching = computed(() => {
      return transactions.value ? false : true;
    });
    return { transactions, isFetching,key };
  },
};
</script>

<style></style>
