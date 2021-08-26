<template>
  <base-card>
    <base-h class="px-20">New Group</base-h>
    <form @submit.prevent="submitForm">
      <base-input label="Group : ">
        <input class="form-input" type="text" v-model="group" />
      </base-input>
      <div class="px-32 py-4">
        <base-button type="submit"> Add </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import { mapActions } from "vuex";
import BaseInput from "../UI/BaseInput.vue";

export default {
  components: { BaseInput },
  data() {
    return {
      group: "",
    };
  },
  methods: {
    ...mapActions(["addTransactionGroup"]),
    submitForm(e) {
      console.log("from submit :  " + this.group);
      const formData = {
        name: capitalizeFirstLetter(this.group),
      };
      this.addTransactionGroup(formData);
      this.group = "";
    },
  },
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<style></style>
