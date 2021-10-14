<template>
  <form @submit.prevent="saveTransaction" class="w-2/3 mx-auto py-2">
    <select
      v-model="groupSelected"
      class="
        focus:outline-none
        box-border
        w-full
        mb-1.5
        bg-blue-100
        border-b border-indigo-300
      "
    >
      <option value="" selected disabled>Your group</option>
      <option v-for="group in groups" :key="group.id" :value="group">
        {{ group.name }}
      </option>
    </select>

    <base-input
      type="date"
      v-model:value="enteredDate"
      pattern="\d{4}-\d{2}-\d{2}"
    />
    <base-input
      type="text"
      placeHolder="Your amount"
      v-model:value.number="enteredAmount"
    />
    <base-input
      type="text"
      placeHolder="Your note"
      v-model:value.trim="enteredNote"
    />
    <div class="text-xs">
      <p class="text-red-400" v-if="isError">
        {{ error }}
      </p>
      <p class="text-green-500" v-else-if="isSuccess">Saved</p>
    </div>
    <base-button type="submit">Save</base-button>
  </form>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  checkError,
  throwError,
  isBlank,
  isEmpty,
  toggleInfo,
} from "../../common/Error";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    store.dispatch("getGroups");
    const enteredDate = ref();
    const enteredAmount = ref();
    const enteredNote = ref();
    const groupSelected = ref("");
    let isError = ref(false);
    let isSuccess = ref(false);
    let error = ref("");
    const errors = reactive({
      date: "Date can't be blank",
      amount: "Amound is not a number",
      server: "Something went wrong",
    });

    const groups = computed(() => store.getters.groups);
    const transaction = computed(() => store.getters.transaction);
    let id = computed(() => route.query.id || undefined);
    getTransaction();
    async function getTransaction() {
      if (id.value !== undefined) {
        await store.dispatch("getTransaction", id.value);
        fillData();
      }
    }

    function fillData() {
      if (transaction.value) {
        enteredDate.value = transaction.value.onDate;
        enteredAmount.value = transaction.value.amount;
        groupSelected.value = transaction.value.groups;
        enteredNote.value = transaction.value.note;
      }
    }
    function checkEmptyGroup() {
      if (isEmpty(groupSelected.value) || groupSelected.value === undefined) {
        return (groupSelected.value = null);
      }
    }
    async function saveTransaction() {
      checkEmptyGroup();
      validate();
      try {
        await store.dispatch("saveTransaction", formData());
        toggleInfo(isError, isSuccess);
      } catch (err) {
        checkError(err, 400, isError, error, errors.server);
      }
    }
    let formData = () => {
      return {
        id: id.value,
        onDate: enteredDate.value,
        amount: enteredAmount.value,
        note: enteredNote.value,
        groups: JSON.parse(JSON.stringify(groupSelected.value)),
      };
    };
    function validate() {
      validateDate(enteredDate.value);
      validateAmount(enteredAmount.value);
    }
    function validateDate(date) {
      if (isEmpty(date) || isBlank(date)) {
        throwError(isError, error, errors.date);
      }
    }

    function validateAmount(amount) {
      if (isEmpty(amount) || isBlank(amount) || isNaN(amount)) {
        throwError(isError, error, errors.amount);
      }
    }

    return {
      enteredDate,
      enteredAmount,
      enteredNote,
      groups,
      groupSelected,
      saveTransaction,
      isError,
      isSuccess,
      error,
    };
  },
};
</script>
