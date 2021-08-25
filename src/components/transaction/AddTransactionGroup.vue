<template>
  <h3>Add Group</h3>
  <base-card class="form-container">
    <form class="form-controls" @submit.prevent="submitForm">
      <div class="form-control">
        <label>Group : </label>
        <input type="text" v-model="group" />
      </div>
      <base-button>Add</base-button>
    </form>
  </base-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      group: "",
    };
  },
  methods: {
    ...mapActions(["addTransactionGroup"]),
    submitForm() {
      const formData = {
        name: capitalizeFirstLetter(this.group),
      };
      this.addTransactionGroup(formData);
    },
  },
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<style></style>
