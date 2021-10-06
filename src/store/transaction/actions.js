import axios from "../../api/Client";

const GET_TRANSACTIONS = "/transactions";
const ADD_TRANSACTION = "/transaction/add";
const GET_TRANSACTION = "/transaction";
const DELETE_TRANSACTION = "/transaction/delete";
const GET_GROUPS = "/groups";
const ADD_GROUP = "/group/add";
const GET_GROUP = "/group";
const DELETE_GROUP = "/group/delete";
const REPORT = "/report";

export default {
  async getTransactions(context, pageRequest) {
    const request = {
      userId: localStorage.getItem("user_id"),
      page: pageRequest.page,
      pageSize: pageRequest.size,
    };
    const response = await axios.post(GET_TRANSACTIONS, request);
    const result = await response.data;
    context.commit("setTransactions", result);
  },
  async getTransaction(context, id) {
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
    context.commit("setTransaction", result);
  },
  async getGroups(context) {
    const response = await axios.post(
      GET_GROUPS,
      {},
      {
        params: {
          userid: localStorage.getItem("user_id"),
        },
      }
    );

    const result = await response.data;
    context.commit("setGroups", result);
  },
  async getGroup(context, id) {
    const response = await axios.post(
      GET_GROUP,
      {},
      {
        params: {
          id: id,
          userid: localStorage.getItem("user_id"),
        },
      }
    );
    const result = await response.data;

    context.commit("setGroup", result);
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
    await axios.post(ADD_TRANSACTION, transaction);
  },
  async saveGroup(context, payload) {
    const group = {
      id: payload.id,
      name: payload.name,
      userId: localStorage.getItem("user_id"),
    };
    const response = await axios.post(ADD_GROUP, group);
    const result = await response.data;
    context.commit("pushGroup", result);
  },
  async deleteTransaction(context, id) {
    const transaction = {
      id: id,
      userid: localStorage.getItem("user_id"),
    };
    await axios.delete(DELETE_TRANSACTION, { params: transaction });
  },
  async deleteGroup(context, id) {
    const group = {
      id: id,
      userid: localStorage.getItem("user_id"),
    };
    await axios.delete(DELETE_GROUP, { params: group });
  },
  async getReport(context, payload) {
    const report = {
      month: payload.month,
      year: payload.year,
      userId: localStorage.getItem("user_id"),
    };
    const response = await axios.post(REPORT, report);
    const result = await response.data;
    context.commit("setReport", result);
  },
};
