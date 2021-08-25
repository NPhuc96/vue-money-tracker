<template>
  <base-card>
    <span class="text-2xl font-bold px-24">New Group</span>
    <form @submit.prevent="submitForm">
      <base-input label="Group : " type="text" />
      <div class="px-32 py-4">
        <base-button> Add </base-button>
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
