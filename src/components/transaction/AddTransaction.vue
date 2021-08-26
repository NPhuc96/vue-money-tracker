<template>
  <base-card>
    <base-h class="px-20">New Transaction</base-h>
    <form @submit.prevent="submitForm">
      <base-input label="Group : ">
        <select v-model="groupSelected" class="form-select">
          <option disabled value="">Please select one</option>
          <option v-for="group in groups" :key="group.id" :value="group">
            {{ group.name }}
          </option>
        </select>
      </base-input>

      <base-input label="Date : ">
        <input class="form-input" type="date" v-model="time" />
      </base-input>
      <base-input label="Money : ">
        <input class="form-input" type="text" v-model.number="money" />
      </base-input>
      <base-input label="Note : ">
        <input class="form-input" type="text" v-model.trim="note" />
      </base-input>

      <div class="px-32 py-4">
        <base-button type="submit"> Add </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseButton from "../../components/UI/BaseButton.vue";
import BaseCard from "../UI/BaseCard.vue";
import BaseInput from "../UI/BaseInput.vue";

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseCard,
  },
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
