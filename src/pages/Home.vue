<template>
<div class="lg:w-1/2 mx-auto md:w-full">
  <the-navigation :switchToTransaction="switchToTransaction" />
  <main id="main" :key="key">
    <the-addition v-if="isShow" :switchToHome="switchToHome" :key="key" />
    <transaction-list
      @updateTransaction="updateTransaction"
      @updateGroup="updateGroup"
      :transactions="transactions"
      :isFetching="isFetching"
    />
  </main>
  </div>
</template>

<script>
import TransactionList from "../components/transaction/TransactionList.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { reactive, computed, watch, ref } from "vue";
import TheAddition from "./transaction/TheAddition.vue";

export default {
  components: { TransactionList, TheAddition },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const page = computed(() => +route.query.page || 1);
    const size = computed(() => +route.query.size || 10);
    let isShow = computed(
      () => route.name == "addTransaction" || route.name == "addGroup"
    );
    let transactions = computed(() => store.getters.transactions);
    let key = computed(() => store.getters.key);
    const pageRequest = reactive({
      page: page,
      size: size,
    });
    watch([pageRequest, key], () => {
      getTransaction();
    });
    getTransaction();
    function getTransaction() {
      store.dispatch("getTransactions", pageRequest);
    }
    let isFetching = computed(() => {
      return transactions.value ? false : true;
    });

    function switchToTransaction() {
      router.push({ name: "addTransaction" });
    }
    function switchToHome() {
      router.push({ name: "home", query: pageRequest });
    }
    function updateTransaction(id) {
      router.push({ name: "addTransaction", query: { id: id } });
    }
    function updateGroup(id) {
      router.push({ name: "addGroup", query: { id: id } });
    }
    return {
      transactions,
      isFetching,
      key,
      isShow,
      switchToTransaction,
      switchToHome,
      updateTransaction,
      updateGroup,
    };
  },
};
</script>
