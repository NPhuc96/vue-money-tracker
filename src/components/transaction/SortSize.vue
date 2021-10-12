<template>
  <div class="flex mx-auto w-full sm:w-90 md:w-1/2 lg:w-45 xl:w-35 mt-4">
    <select
      v-model="selectedSortBy"
      class="border border-indigo-200 bg-gray-50 focus:outline-none"
      @input="$emit('getSort', $event.target.value)"
    >
      <option value="id">Newest</option>
      <option value="date">Date</option>
    </select>
    <div class="flex gap-1 ml-24">
      <base-anchor :class="{ 'bg-blue-500 text-white': isCurrent(5) }"
        ><button @click.prevent="$emit('updateSize', 5)">5</button></base-anchor
      >
      <base-anchor :class="{ 'bg-blue-500 text-white': isCurrent(10) }"
        ><button @click.prevent="$emit('updateSize', 10)">
          10
        </button></base-anchor
      >
      <base-anchor :class="{ 'bg-blue-500 text-white': isCurrent(15) }"
        ><button @click.prevent="$emit('updateSize', 15)">
          15
        </button></base-anchor
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  emits: ["getSort", "updateSize"],
  setup() {
    const route = useRoute();
    let selectedSortBy = ref("id");
    let isCurrent = (current) => route.query.size == current;
    return { selectedSortBy, isCurrent };
  },
};
</script>

<style></style>
