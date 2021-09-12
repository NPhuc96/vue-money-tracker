<template>
  <div>
    <div>{{ day }} {{ month }}</div>
    <div>{{ year }}</div>
  </div>
  <div>{{ money }}</div>
  <div>{{ group }}</div>
  <div>{{ note }}</div>
  <div>
    <base-button>Edit</base-button>
    <base-button>Delete</base-button>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    onDate: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const monthNames = ref([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);

    const year = computed(() => props.onDate.substring(0, 4));
    const month = computed(
      () => monthNames.value[props.onDate.substring(6, 7) - 1]
    );
    const day = computed(() => props.onDate.substring(8, 10));
    const money = computed(() =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(props.amount)
    );

    return { year, month, day, money };
  },
};
</script>
