<template>
  <div class="lg:w-3/4 mx-auto md:w-full" :key="key">
    <base-dialog
      :showDialog="showDialog"
      :deleteItem="deleteItem"
      :toggleDialog="toggleDialog"
    >
    </base-dialog>
    <main id="main" :key="key">
      <the-addition v-if="isShow" :switchToHome="switchToHome" />
      <sort-size @getSort="getSort" @updateSize="updateSize" />
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
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { reactive, computed, watch, ref } from "vue";
import TheAddition from "./transaction/TheAddition.vue";
import TransactionList from "../components/transaction/TransactionList.vue";
import SortSize from "../components/transaction/SortSize.vue";

export default {
  components: { TransactionList, TheAddition, SortSize },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const page = computed(() => +route.query.page || 1);
    const size = computed(() => +route.query.size || 5);
    const sortBy = computed(() => route.query.sortBy || "id");
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
      sortBy: sortBy,
    });
    watch([pageRequest, key], () => {
      getTransaction();
    });
    getTransaction();
    switchToHome();
    async function getTransaction() {
      await store.dispatch("getTransactions", pageRequest);
    }
    let isFetching = computed(() => {
      return transactions.value ? false : true;
    });

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
    function getSort(sortParam) {
      router.push({
        name: "home",
        query: { page: page.value, size: size.value, sortBy: sortParam },
      });
    }
    async function updateSize(sizeParam) {
      router.push({
        name: "home",
        query: { page: 1, size: sizeParam, sortBy: sortBy.value },
      });
    }
    async function deleteItem() {
      if (isDeleteTransaction.value) {
        await deleteTransaction();
      } else {
        await deleteGroup();
      }
      toggleDialog();
      await store.dispatch("forceUpdate", +1);
    }
    function toggleDialog() {
      showDialog.value = !showDialog.value;
    }

    async function deleteTransaction() {
      await store.dispatch("deleteTransaction", id.value);
    }
    async function deleteGroup() {
      await store.dispatch("deleteGroup", id.value);
    }

    return {
      transactions,
      isFetching,
      key,
      isShow,
      showDialog,
      switchToHome,
      updateTransaction,
      updateGroup,
      getTransactionId,
      getGroupId,
      deleteItem,
      toggleDialog,
      getSort,
      updateSize,
    };
  },
};
</script>
