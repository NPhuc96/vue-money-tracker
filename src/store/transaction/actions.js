import axios from 'axios';

const URL = process.env.VUE_APP_RESOURCE_URL;

const options = {
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
}

export default {
    async fetchTransactions({ commit }) {
        const response = await axios.get(URL + '/api/transaction');
        //console.log(response.data);
        commit('setTransactions', response.data);
    }
}