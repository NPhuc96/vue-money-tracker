<template>
  <div
    class="mt-6 mx-auto w-full sm:w-90 md:w-9/12 lg:w-1/2 xl:w-45"
    v-if="!isLoading"
  >
    <div class="flex ml-3 sm:ml-6 md:ml-10 lg:ml-12">
      <div class="pr-2">
        <select
          v-model="dateSelected"
          class="border border-indigo-200 bg-gray-50 focus:outline-none"
        >
          <option v-for="month in lastFiveMonth" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>
      <div class="font-medium">Total : {{ spentOfMonth }}</div>
    </div>
    <apexchart
      class="mt-3 ml-3 sm:ml-6 md:ml-10 lg:ml-12"
      width="400"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import moment from "moment";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let month = computed(() => route.query.month || moment().format("MM"));
    let year = computed(() => route.query.year || moment().format("YYYY"));
    const getReport = async () => {
      await store.dispatch("getReport", {
        month: month.value,
        year: year.value,
      });
    };
    getReport();
    intitalParam();
    const report = computed(() => store.getters.report);

    let dateSelected = ref(month.value + "/" + year.value);
    let isLoading = computed(() => (report.value ? false : true));
    const spentOfMonth = computed(() =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(report.value.spentOfMonth)
    );
    const lastFiveMonth = computed(() => {
      let lastFiveMonth = [];
      for (let n = 0; n <= 5; n++) {
        lastFiveMonth.push(moment().subtract(n, "months").format("MM/YYYY"));
      }
      return lastFiveMonth;
    });

    watch([dateSelected, month, year], () => {
      pushParam(dateSelected.value);
      getReport();
    });

    const series = computed(() => [{ data: report.value.spentOfWeek }]);
    const options = computed(() => ({
      chart: {
        height: 300,
        type: "bar",
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 300,
          options: {
            plotOptions: {
              bar: {
                columnWidth: "20%",
              },
            },
            chart: {
              width: "95%",
            },
          },
        },
      ],

      xaxis: {
        categories: report.value.weekOfMonth,
      },
      yaxis: {
        labels: {
          show: true,
          formatter: (value) => {
            return yLabels(value);
          },
        },
      },
    }));
    function yLabels(value) {
      return value.toLocaleString("vi-VN");
    }
    function pushParam(dateSelected) {
      if (route.name != "reports") {
        router.push({ name: route.name });
      } else
        router.push({
          name: "reports",
          query: {
            month: dateSelected.substring(0, 2),
            year: dateSelected.substring(3),
          },
        });
    }
    function intitalParam() {
      router.push({
        name: "reports",
        query: { month: month.value, year: year.value },
      });
    }
    return {
      isLoading,
      series,
      options,
      spentOfMonth,
      lastFiveMonth,
      dateSelected,
    };
  },
};
</script>
