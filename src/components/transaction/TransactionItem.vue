<template>
  <button @click="show" class="flex flex-col w-full rounded-xl  border-4 border-red-100">
    <div class="flex flex-row gap-1 w-full text-left border-4 border-blue-100">
      <div class="w-1/3 border-4 border-green-100">
        {{ day }} {{ month }}
        <div>{{ year }}</div>
      </div>
      <div class="w-1/3 border-4 border-green-100">{{ group }}</div>
      <div class="w-1/3 border-4 border-green-100">{{ money }}</div>
    </div>
    <div v-if="isShow" class=" flex flex-row flex-wrap gap-1 text-left w-full border-4 border-purple-100">
        <div class="w-2/3 border-4 border-yellow-100">{{ note }}</div>
        <div class="w-32 border-4 border-pink-100">
          <button @click="$emit('showUpdate',id)" class="w-1/2">
            <img src="../../assets/edit.svg"/>
          </button>
          <button class="w-1/2">
            <img src="../../assets/delete.svg"/>
          </button>
      </div>
      </div>
      
  </button>
</template>

<script>
import { ref, computed } from "vue";


export default {
  emits: ["showUpdate"],
  props: {
    id: {
      type : Number,
      required:true
    },
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
    }
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
    return { year, month, day, money, isShow, show };
  },
};
</script>
