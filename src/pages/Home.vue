<template>
  <the-navigation :showAddition="showAddition"/>
  <main id="main" :key="key">
     <the-addition v-if="isShow" :showAddition="showAddition" :key="key"/>
    <transaction-list 
      @updateTransaction="updateTransaction"
      @updateGroup="updateGroup"
      :transactions="transactions"
      :isFetching="isFetching"
    />
  </main>
</template>

<script>
import TransactionList from "../components/transaction/TransactionList.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { reactive, computed, watch,ref } from "vue";
import TheAddition from './transaction/TheAddition.vue';

export default {
  components: { TransactionList, TheAddition },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const page = computed(() => route.query.page || 1);
    const size = computed(() => route.query.size || 15);
    let isShow = ref(false);
    let transactions = computed(() => store.getters.transactions);
    let key = computed(()=>store.getters.key);  
    const pageRequest = reactive({
      page: page,
      size: size,
    });
    watch([pageRequest,key], () => {     
      getTransaction();
    });
    getTransaction();
    function getTransaction() {      
      store.dispatch("getTransactions", pageRequest);
    }
    let isFetching = computed(() => {
      return transactions.value ? false : true;
    });
    function showAddition(){  
      isShow.value = !isShow.value;
      switchAddRoute();    
    }
    function switchAddRoute(){
      if(isShow.value){
        router.push({ name:"addTransaction" });
      }
      else      
        router.push({name :"home",query: pageRequest });
    }
    function updateTransaction(id){
       isShow.value = !isShow.value;
      router.push({ name:"addTransaction",query:{id : id}});
    }
    function updateGroup(id){
       isShow.value = !isShow.value;
      router.push({ name:"addGroup",query:{id : id}});
    }
    return { transactions, isFetching,key,isShow,showAddition,updateTransaction,updateGroup };
  },
};
</script>
