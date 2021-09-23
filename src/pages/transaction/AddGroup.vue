<template>
  <base-card>
  <form @submit.prevent="saveGroup" class="w-2/3 mx-auto py-4">
      <base-input type="text" placeHolder="New group" v-model:value.trim="enteredGroup"/>
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
