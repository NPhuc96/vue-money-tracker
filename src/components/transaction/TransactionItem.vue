<template>
  <div class="shadow-lg border-2 border-indigo-200 bg-red-50 rounded-xl mb-3">
    <button @click="show" class="flex flex-col w-full">
      <div class="flex flex-row gap-1 w-full text-left">
        <div class="w-1/3 pb-2 font-bold">
          {{ day }} {{ month }}
          <div>{{ year }}</div>
        </div>

        <div class="w-2/3 font-bold">
          {{ money }}
          <div class="capitalize text-xs font-normal">{{ note }}</div>
        </div>
        <div class="w-1/4">
          <button
            @click.prevent="$emit('updateTransaction', transactionId)"
            class="w-1/2"
          >
            <img src="../../assets/edit.svg" />
          </button>
          <button class="w-1/2">
            <img src="../../assets/delete.svg" />
          </button>
        </div>
      </div>
    </button>
    <div v-if="isShow">
      <div
        v-if="!isGroupNull"
        class="flex flex-row flex-wrap pb-4 text-left w-full"
      >
        <div class="w-3/4 font-bold">{{ group.name }}</div>
        <div class="w-1/4 pl-2">
          <button @click.prevent="$emit('updateGroup', group.id)" class="w-1/2">
            <img src="../../assets/edit.svg" />
          </button>
          <button class="w-1/2">
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
  emits: ["updateTransaction", "updateGroup"],
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
    let isGroupNull = computed(()=>props.group == undefined);
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

    return { year, month, day, money, isShow, show, isGroupNull };
  },
};
</script>
