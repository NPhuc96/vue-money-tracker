import { createRouter, createWebHistory } from 'vue-router';
import AddTransaction from './components/transaction/AddTransaction.vue'
import TransactionList from "./components/transaction/TransactionList.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/add', component: AddTransaction
        },
        {
            path: '/', component: TransactionList 
        }
    ]
});

export default router;