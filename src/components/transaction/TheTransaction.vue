<template>
  <base-card
    class="container grid grid-cols-1 md:grid-cols-5 mx-auto py-1 bg-gray-100"
  >
    <div class="w-3/4 px-3 bg-green-50 text-lg font-bold">
      <div>{{ formattedTime.day }} {{ formattedTime.month }}</div>
      <div>{{ formattedTime.year }}</div>
    </div>
    <span>{{ group }}</span>
    <span>{{ note }}</span>
    <span>{{ money }}</span>
    <div>
      <base-button class="w-2/4 hover:bg-green-200"
        ><img src="../../assets/edit.svg"
      /></base-button>
      <base-button class="w-2/4 hover:bg-red-200"
        ><img src="../../assets/delete.svg"
      /></base-button>
    </div>
  </base-card>
</template>

<script>
import BaseButton from "../../components/UI/BaseButton.vue";
export default {
  components: { BaseButton },
  props: {
    group: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    money: {
      type: Number,
      required: true,
    },
  },

  computed: {
    formattedTime() {
      return {
        year: this.time.substring(0, 4),
        month: monthNames[this.time.substring(6, 7) - 1],
        day: this.time.substring(8, 10),
      };
    },
  },
};
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function transformMonth(String) {}
</script>
