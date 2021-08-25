<template>
  <base-card>
    <div class="text-2xl font-bold px-24">New Transaction</div>
    <form @submit.prevent="submitForm">
      <base-input-select
        v-model="groupSelected"
        :options="groups"
        label="Group : "
      />
      <base-input type="date" v-model="time" label="Date : " />
      <base-input type="text" v-model.number="money" label="Money : " />
      <base-input type="text" v-model.trim="note" label="Note : " />

      <div class="px-32 py-4">
        <base-button> Add </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseButton from "../../components/UI/BaseButton.vue";
import BaseInput from "../UI/BaseInput.vue";
import BaseInputSelect from "../UI/BaseInputSelect.vue";

export default {
  components: { BaseButton, BaseInput, BaseInputSelect },
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
