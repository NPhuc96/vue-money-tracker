<template>
  <div class="lg:w-1/2 mx-auto md:w-full">
    <base-dialog
      :showDialog="showDialog"
      :deleteItem="deleteItem"
      :toggleDialog="toggleDialog"
    >
    </base-dialog>
    <the-navigation :switchToTransaction="switchToTransaction" />
    <main id="main" :key="key">
      <the-addition v-if="isShow" :switchToHome="switchToHome" :key="key" />
      <transaction-list
        @updateTransaction="updateTransaction"
        @updateGroup="updateGroup"
        @getTransactionId="getTransactionId"
        @getGroupId="getGroupId"
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
    let isDeleteTransaction = ref(true);
    let showDialog = ref(false);
    let id = ref(0);
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
    function getTransactionId(transactionId) {
      toggleDialog();
      isDeleteTransaction.value = true;
      id.value = transactionId;
    }
    function getGroupId(groupId) {
      toggleDialog();
      isDeleteTransaction.value = false;
      id.value = groupId;
    }
    function deleteItem() {
      if (isDeleteTransaction.value) {
        deleteTransaction();
      } else deleteGroup();
      toggleDialog();
    }
    function toggleDialog() {
      showDialog.value = !showDialog.value;
    }

    async function deleteTransaction() {
      await store.dispatch("deleteTransaction", id.value);
      store.dispatch("forceUpdate", +1);
    }
    async function deleteGroup() {
      await store.dispatch("deleteGroup", id.value);
      store.dispatch("forceUpdate", +1);
    }
    return {
      transactions,
      isFetching,
      key,
      isShow,
      showDialog,
      switchToTransaction,
      switchToHome,
      updateTransaction,
      updateGroup,
      getTransactionId,
      getGroupId,
      deleteItem,
      toggleDialog,
    };
  },
};
</script>
