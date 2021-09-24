<template>
  <base-card class=" " >
    <form @submit.prevent="saveTransaction" class="w-2/3 mx-auto py-4">

       <select  v-model="groupSelected" class="focus:outline-none box-border w-full mb-2">
        <option value="" selected disabled >Your group</option>
        <option v-for="group in groups" :key="group.id" :value="group">
          {{ group.name }}
        </option>
      </select>

      <base-input type="date" v-model:value="enteredDate" 
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
      <base-button type="submit">Save</base-button>
    </form>
  </base-card>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {useRoute} from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    store.dispatch("getGroups");
    const enteredDate = ref();
    const enteredAmount = ref();
    const enteredNote = ref();
    const groupSelected = ref("");
    const error = ref();
    const isError = ref();
    const groups = computed(() => store.getters.groups);
    const transaction = computed(()=> store.getters.transaction);
    let id = computed(()=>route.query.id||undefined);
    getTransaction();
    async function getTransaction(){
        if(id.value !== undefined){
            await store.dispatch("getTransaction",id.value);
            fillData();
        }
    }
      
    function fillData(){       
        if(transaction.value){
            enteredDate.value = transaction.value.onDate,
            enteredAmount.value = transaction.value.amount,
            groupSelected.value = transaction.value.groups,
            enteredNote.value = transaction.value.note
        }
    }
    function checkEmptyGroup(){
        if(groupSelected.value === "" || groupSelected.value === undefined){
            return groupSelected.value = null;
        }
    }
    function saveTransaction(){
        checkEmptyGroup();
        const formData ={
            id : id.value,
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
