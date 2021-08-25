
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

//I should update transactions when ever i add or update it
// The same go to transactionGroup
export default {
    state() {
        return {
            transactions: {},
            transactionGroups: []/* ,
            transaction: {},
            transactionGroup : {} */
            
        }
    },
    mutations,
    actions,
    getters
}

