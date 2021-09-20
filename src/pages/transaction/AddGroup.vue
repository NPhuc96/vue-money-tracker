<template>
  <base-card>
  <form @submit.prevent="saveGroup">
      <base-input type="text" placeHolder="name of the group" v-model:value.trim="enteredGroup"/>
      <base-button type="submit">Save</base-button>
      
  </form>
  </base-card>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
    setup(){
        const store = useStore();
        const enteredGroup = ref();
        function saveGroup(){
            store.dispatch("saveGroup",enteredGroup.value);
        }
        return {enteredGroup,saveGroup}
    }
}
</script>
