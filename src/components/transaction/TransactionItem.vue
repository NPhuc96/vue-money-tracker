<template>
  <div
    class="shadow-lg border-2 border-indigo-200 rounded-xl mb-3"
    :class="levelsOfBg()"
  >
    <button @click="show" class="flex flex-col flex-wrap w-full font-medium">
      <div class="flex flex-row gap-1 w-full text-left">
        <div class="w-1/3 pb-2">
          {{ day }} {{ month }}
          <div>{{ year }}</div>
        </div>

        <div class="w-2/3">
          {{ money }}
          <div class="capitalize text-xs font-light">{{ note }}</div>
        </div>
        <div class="w-1/4">
          <button
            @click.prevent="$emit('updateTransaction', transactionId)"
            class="w-1/2"
          >
            <img src="../../assets/edit.svg" />
          </button>
          <button
            @click.prevent="$emit('getTransactionId', transactionId)"
            class="w-1/2"
          >
            <img src="../../assets/delete.svg" />
          </button>
        </div>
      </div>
    </button>
    <div v-if="isShow">
      <div v-if="!isGroupNull" class="flex flex-row pb-1 text-left w-full">
        <div class="w-1/3 font-medium">{{ group.name }}</div>
        <div class="w-1/3 pr-4">
          <button @click.prevent="$emit('updateGroup', group.id)" class="w-1/2">
            <img src="../../assets/edit.svg" />
          </button>
          <button @click.prevent="$emit('getGroupId', group.id)" class="w-1/2">
            <img src="../../assets/delete.svg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  emits: ["updateTransaction", "updateGroup", "getTransactionId", "getGroupId"],
  props: {
    transactionId: {
      type: Number,
      required: true,
    },
    onDate: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    group: {},
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
    let isShow = ref(false);
    let isGroupNull = computed(() => props.group == undefined);
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
    function show() {
      isShow.value = !isShow.value;
    }
    function levelsOfBg() {
      if (isRed(1, 10, 6)) {
        return level("gray", 50);
      } else if (isRed(3, 10, 6)) {
        return level("red", 50);
      } else if (isRed(5, 10, 6)) {
        return level("red", 100);
      } else {
        return level("red", 200);
      }
    }
    function isRed(number, base, exponent) {
      return props.amount <= number * Math.pow(base, exponent);
    }
    function level(color, level) {
      return `bg-${color}-${level}`;
    }
    return { year, month, day, money, isShow, show, isGroupNull, levelsOfBg };
  },
};
</script>
