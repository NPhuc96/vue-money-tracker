import axios from "../../api/Client";

const GET_TRANSACTION = "/transaction";

export default {
  async getTransactions(context, pageRequest) {
    const request = {
      userId: localStorage.getItem("user_id"),
      page: pageRequest.page,
      pageSize: pageRequest.size,
    };
    const response = await axios.post(GET_TRANSACTION, request);
    const result = await response.data;
    console.log(result);
    context.commit("setTransactions", result);
  },
};
