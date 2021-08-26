export default {
  getTransactions(state) {
    return state.transactions;
  },
  getTransactionGroup(state) {
    return state.transactionGroups;
  },
  getTempTransaction(state) {
    return state.tempTransactions;
  },
};
