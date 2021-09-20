<template>
  <the-navigation :showAddition="showAddition"></the-navigation>
  <main id="main" :key="key" >
    <the-addition v-if="isShow"/>
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
    function showAddition(){
      
      isShow.value = !isShow.value
      switchRoute()
      
    }
    function switchRoute(){
      if(isShow.value){
        router.push({ name:"theAddition" });
      }else      
       router.push({name :"home",query: pageRequest })    
    }

    return { transactions, isFetching,key,isShow,showAddition };
  },
};
</script>

<style></style>
