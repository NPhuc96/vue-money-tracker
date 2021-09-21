import axios from "../../api/Client";

const GET_TRANSACTIONS = "/transactions";
const ADD_TRANSACTION = "/transaction/add";
const GET_TRANSACTION = "/transaction";
const GET_GROUP = "/groups";
const ADD_GROUP = "/group/add";

export default {
  async getTransactions(context, pageRequest) {
    const request = {
      userId: localStorage.getItem("user_id"),
      page: pageRequest.page,
      pageSize: pageRequest.size,
    };
    const response = await axios.post(GET_TRANSACTIONS, request);
    const result = await response.data;
    console.log(result);
    context.commit("setTransactions", result);
  },
  async getTransaction(context,id){
    const response = await axios.post(
      GET_TRANSACTION,
      {},
      {
        params: {
          id: id,
          userid: localStorage.getItem("user_id"),
        },
      }
    );
    const result = await response.data;
    console.log(result);
    context.commit("setTransaction", result);
  },
  async getGroups(context) {
    const response = await axios.post(
      GET_GROUP,{},{params: {
          userid: localStorage.getItem("user_id"),
        },
      }
    );
   
    const result = await response.data;
    console.log(result);
    context.commit("setGroups", result);
  },
  async saveTransaction(context, payload) {

    const transaction = {
      id: payload.id,
      onDate: payload.onDate,
      amount: payload.amount,
      note: payload.note,
      groups: payload.groups,
      userId: localStorage.getItem("user_id"),
    };
    const response = await axios.post(ADD_TRANSACTION, transaction);
    const result = await response.data;
    console.log(result);
  },
  async saveGroup(context,payload){
    const group = {
      name: payload,
      userId: localStorage.getItem("user_id"),
    };
     const response = await axios.post(ADD_GROUP, group);
     const result = await response.data;
     console.log(result);
     context.commit("pushGroup", result);
  }
};
