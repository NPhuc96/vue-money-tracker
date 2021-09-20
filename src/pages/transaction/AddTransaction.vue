<template>
  <base-card>
    <form @submit.prevent="saveTransaction">
      <select v-model="groupSelected">
        <option disabled value="">Select one</option>
        <option v-for="group in groups" :key="group.id" :value="group">
          {{ group.name }}
        </option>
      </select>

      <base-input type="date" v-model:value="enteredDate" 
      pattern="\d{4}-\d{2}-\d{2}"
      />
      <base-input
        type="text"
        placeHolder="spent amount"
        v-model:value.number="enteredAmount"
      />
      <base-input
        type="text"
        placeHolder="note here"
        v-model:value.trim="enteredNote"
      />
      <base-button type="submit">Save</base-button>
    </form>
  </base-card>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    store.dispatch("getGroups");
    const enteredDate = ref();
    const enteredAmount = ref();
    const enteredNote = ref();
    const groupSelected = ref();
    const error = ref();
    const isError = ref();
    const groups = computed(() => store.getters.groups);
    function saveTransaction(){
        const formData ={
            onDate: enteredDate.value,
            amount: enteredAmount.value,
            note: enteredNote.value,
            groups : JSON.parse(JSON.stringify(groupSelected.value))
        }
        store.dispatch("saveTransaction",formData);
        store.dispatch("forceUpdate",+1);
    }
        
    return { enteredDate, enteredAmount, enteredNote, groups, groupSelected,saveTransaction };
  },
};
</script>
