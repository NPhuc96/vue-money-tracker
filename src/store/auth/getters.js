export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  expiration(state) {
    return state.expiration;
  },
  isAuthenticated(state) {
    return !state.token;
  },
};
