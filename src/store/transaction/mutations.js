export default {
  setTransactions(state, payload) {
    state.transactions = payload;
  },
  setGroups(state,payload){
    state.groups = payload;
  },
  pushGroup(state,payload){
    state.groups.push(payload);
  }
};
