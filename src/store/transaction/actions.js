import axios from "../../api/Client";

const GET_TRANSACTION = "/transaction";

export default {
  async getTransactions(context, pageRequest) {
    const request = {
      userId: pageRequest.userId,
      page: pageRequest.page === null ? 1 : pageRequest.page,
      pageSize: pageRequest.pageSize === null ? 15 : pageRequest.pageSize,
    };
    console.log(request);
    const response = await axios.post(GET_TRANSACTION, request);
    const result = await response.data;
    console.log(result);
    context.commit("setTransactions", result);
  },
};
