export default{
    forceUpdate(context,payload){
        context.commit("setKey", payload);
    },
    isLoading(context,payload){
        context.commit("setIsLoading",payload);
    }
}