export default{
    setKey(state,payload){
        state.key += payload;
    },
    setIsLoading(state,payload){
        state.isLoading = payload;
    }
}