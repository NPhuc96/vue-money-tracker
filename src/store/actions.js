export default{
    forceUpdate(context,payload){
        context.commit("setKey", payload);
    }
}