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
import {useRoute,useRouter} from "vue-router";
import { reactive,computed,watch } from "vue";

export default {
 
  components: { TransactionList },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const page =  computed(()=> route.query.page || 1);
    const size = computed(()=>route.query.size || 15);

    const pageRequest = reactive({
      page: page,
      size: size,
    });
    watch(pageRequest,()=>{
      getTransaction();
    })
    function getTransaction() {
      router.replace({query :pageRequest});
      store.dispatch("getTransactions", pageRequest);
    }
    getTransaction();
    let transactions = computed(() => store.getters.transactions);
    let isFetching = computed(() => {
      return transactions.value ? false : true;
    });
    return { transactions, isFetching};
  },
};
</script>

<style></style>
