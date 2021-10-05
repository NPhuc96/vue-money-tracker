<template>
  <div v-if="!isLoading" class="w-1/2 mx-auto">
    <apexchart width="500" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watch, reactive } from "vue";
import { useStore } from "vuex";
import moment from "moment";

export default {
  name: "Report",

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const getReport = async () => await store.dispatch("getReport", time);
    const report = computed(() => store.getters.report);
    let isLoading = computed(() => {
      if (report.value) {
        return false;
      }
      return true;
    });
    let month = computed(
      () => +route.query.month || +9 /* +moment().format("MM") */
    );
    let year = computed(() => +route.query.year || +moment().format("YYYY"));
    let time = reactive({
      month: month.value,
      year: year.value,
    });
    getReport();

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
      xaxis: {
        categories: report.value.weekOfMonth,
      },
      yaxis:{
         labels: {
          show: true,
           formatter: (value) => { return yLabels(value)}
      }
      }
    }));
    function yLabels(value) {  
        return value.toLocaleString('vi-VN');
  
    }
    return { isLoading, series, options };
  },
};
</script>
