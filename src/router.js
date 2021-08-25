import { createRouter, createWebHistory } from 'vue-router';
import AddPage from "./components/pages/AddPage.vue";
import TransactionList from "./components/transaction/TransactionList.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/add', component: AddPage
        },
        {
            path: '/', component: TransactionList 
        }
    ]
});

export default router;