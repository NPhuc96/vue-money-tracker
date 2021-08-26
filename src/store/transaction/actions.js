import axios from "axios";

const URL = process.env.VUE_APP_RESOURCE_URL;

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export default {
  async fetchTransactions({ commit }) {
    const response = await axios.get(URL + "/transaction");

    commit("setTransactions", response.data);
  },

  async fetchTransactionGroup({ commit }) {
    const response = await axios.get(URL + "/group/all");

    commit("setTransactionGroup", response.data);
  },

  // Will add header for auth later
  async addTransaction({ commit }, transaction) {
    const response = await axios.post(URL + "/transaction/add", transaction);
    commit("newTransaction", transaction);
    console.log("from actions : " + transaction);
  },
  async addTransactionGroup({ commit }, transactionGroup) {
    const response = await axios.post(URL + "/group/add", transactionGroup);
    commit("newTransactionGroup", transactionGroup);
    console.log("from actions : " + transactionGroup);
  },
};
