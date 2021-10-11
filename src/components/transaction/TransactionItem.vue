<template>
  <div
    :class="levelsOfBg"
    class="shadow-lg border-2 border-indigo-200 rounded-xl mb-3"
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
            <base-sub-svg class="fill-current hover:text-blue-500">
            <path :d="edit"/>
            </base-sub-svg>
          </button>
          <button
            @click.prevent="$emit('getTransactionId', transactionId)"
            class="w-1/2"
          >
            <base-sub-svg class="fill-current hover:text-red-600">
            <path :d="del"/>
            </base-sub-svg>
          </button>
        </div>
      </div>
    </button>
    <div v-if="isShow">
      <div v-if="!isGroupNull" class="flex flex-row pb-1 text-left w-full">
        <div class="w-1/3 font-medium">{{ group.name }}</div>
        <div class="w-1/3 pr-4">
          <button @click.prevent="$emit('updateGroup', group.id)" class="w-1/2">
            <base-sub-svg class="fill-current hover:text-blue-500">
            <path :d="edit"/>
            </base-sub-svg>
          </button>
          <button @click.prevent="$emit('getGroupId', group.id)" class="w-1/2">
            <base-sub-svg class="fill-current hover:text-red-600">
            <path :d="del"/>
            </base-sub-svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import {editPath,deletePath} from "../../common/SvgPath";

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
    const edit = ref(editPath);
    const del = ref(deletePath);
    let gray = ref("bg-gray-50");
    let lightestRed = ref("bg-red-50");
    let lightRed = ref("bg-red-100");
    let red = ref("bg-red-200");
    let isShow = ref(false);
    let isGroupNull = computed(() => props.group == undefined);
    const year = computed(() => props.onDate.substring(0, 4));
    const month = computed(() => getMonthName());
    const day = computed(() => props.onDate.substring(8, 10));
    const money = computed(() =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(props.amount)
    );
    function getMonthName() {
      let monthName = new Intl.DateTimeFormat("en-US", { month: "short" })
        .format;
      return monthName(new Date(props.onDate));
    }
    function show() {
      isShow.value = !isShow.value;
    }
    let levelsOfBg = computed(() => {
      if (calculateColor(2, 10, 5)) {
        return gray.value;
      } else if (calculateColor(5, 10, 5)) {
        return lightestRed.value;
      } else if (calculateColor(7, 10, 5)) {
        return lightRed.value;
      } else {
        return red.value;
      }
    });
    function calculateColor(number, base, exponent) {
      return props.amount <= number * Math.pow(base, exponent);
    }

    return { year, month, day, money, isShow, show, isGroupNull, levelsOfBg,edit,del };
  },
};
</script>
