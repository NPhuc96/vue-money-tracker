export default {
  setTransactions(state, payload) {
    state.transactions = payload;
  },
  setTransaction(state, payload) {
    state.transaction = payload;
  },
  setGroups(state, payload) {
    state.groups = payload;
  },
  setGroup(state, payload) {
    state.group = payload;
  },
  pushGroup(state, payload) {
    state.groups.push(payload);
  },
  setReport(state,payload){
    state.report = payload;
  }
};
