<template>
  <add-transaction-group></add-transaction-group>
  <base-card class="form-container">
    <h3>Add Transaction</h3>
    <form class="form-controls" @submit.prevent="submitForm">
      <div class="form-control">
        <label>Group : </label>
        <select v-model="groupSelected">
          <option disabled value="">Please select one</option>
          <option v-for="group in groups" :key="group.id" :value="group">
            {{ group.name }}
          </option>
        </select>
      </div>
      <div class="form-control">
        <label>Note : </label>
        <input type="text" v-model.trim="note" />
      </div>
      <div class="form-control">
        <label>Money : </label>
        <input type="text" v-model.number="money" />
      </div>
      <div class="form-control">
        <label>Time : </label>
        <input type="date" v-model="time" />
      </div>
      <base-button>Add</base-button>
    </form>
  </base-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseButton from "../../components/UI/BaseButton.vue";
import AddTransactionGroup from "./AddTransactionGroup.vue";

export default {
  components: { BaseButton, AddTransactionGroup },
  data() {
    return {
      groupSelected: null,
      note: "",
      money: "",
      time: "",
    };
  },

  methods: {
    ...mapActions(["fetchTransactionGroup", "addTransaction"]),
    submitForm() {
      const formData = {
        transactionGroup: JSON.parse(JSON.stringify(this.groupSelected)),
        note: this.note,
        time: this.time,
        money: this.money,
      };
      console.log(formData);
      this.addTransaction(formData);
    },
  },
  computed: {
    ...mapGetters({
      groups: "getTransactionGroup",
    }),
  },
  created() {
    this.fetchTransactionGroup();
  },
};
</script>

<style></style>
