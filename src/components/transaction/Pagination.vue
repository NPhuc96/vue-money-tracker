<template>
  <p v-if="isEmpty" class="font-medium mx-auto">There nothing to show</p>
  <div
    class="mx-auto ml-2 flex gap-0.5 sm:text-sm md:text-base text-center"
    v-if="!isEmpty"
  >
    <base-anchor v-if="isFirst">
      <router-link @click="first" to="">First</router-link>
    </base-anchor>
    <base-anchor v-if="hasPrev">
      <router-link @click="prev" to="">Prev</router-link>
    </base-anchor>

    <base-anchor
      v-for="pageNumber in paginate"
      :key="pageNumber"
      :class="{ 'bg-blue-500 text-white': isCurrentPage(pageNumber) }"
    >
      <router-link to="" @click="changePage(pageNumber)">
        {{ pageNumber }}
      </router-link>
    </base-anchor>

    <base-anchor v-if="hasNext">
      <router-link @click="next" to="">Next</router-link>
    </base-anchor>
    <base-anchor v-if="isLast">
      <router-link @click="last" to="">Last</router-link>
    </base-anchor>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  props: ["pageInfo"],
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const totalPages = computed(() => props.pageInfo.totalPages);
    const page = computed(() => +route.query.page);
    const size = computed(() => +route.query.size);
    const sortBy = computed(() => route.query.sortBy);
    const hasPrev = computed(() => page.value - 1 > 0);
    const hasNext = computed(() => page.value + 1 <= totalPages.value);
    const isFirst = computed(() => page.value != 1);
    const isLast = computed(
      () => page.value != totalPages.value && totalPages.value != 0
    );
    const isEmpty = computed(() => props.pageInfo.totalElements === 0);
    let startPage = 1;
    let endPage = 5;
    function next() {
      router.push({
        query: { page: page.value + 1, size: size.value, sortBy: sortBy.value },
      });
    }
    function prev() {
      router.push({
        query: { page: page.value - 1, size: size.value, sortBy: sortBy.value },
      });
    }
    function first() {
      router.push({
        query: { page: 1, size: size.value, sortBy: sortBy.value },
      });
    }
    function last() {
      router.push({
        query: {
          page: totalPages.value,
          size: size.value,
          sortBy: sortBy.value,
        },
      });
    }
    function changePage(pageNumber) {
      router.push({
        query: { page: pageNumber, size: size.value, sortBy: sortBy.value },
      });
    }
    function isCurrentPage(pageNumber) {
      return page.value == pageNumber;
    }

    const paginate = computed(() => {
      if (totalPages.value <= 4) {
        return totalLessThanDefault();
      } else {
        return totalGreaterThanDefault();
      }
    });
    function totalLessThanDefault() {
      const links = [];
      for (let i = 1; i <= totalPages.value; i++) {
        links.push(i);
      }
      return links;
    }
    function totalGreaterThanDefault() {
      const links = [];
      setStartAndEnd();
      for (let i = startPage; i <= endPage; i++) {
        links.push(i);
      }
      return links;
    }
    function setStartAndEnd() {
      if (page.value >= 4) {
        startPage = page.value - 2;
        endPage = page.value + 2;
        if (page.value + 2 >= totalPages.value) {
          startPage = totalPages.value - 4;
          endPage = totalPages.value;
        }
      } else {
        startPage = 1;
        endPage = 5;
      }
    }

    return {
      first,
      isFirst,
      hasPrev,
      hasNext,
      last,
      isLast,
      next,
      prev,
      isEmpty,
      changePage,
      isCurrentPage,
      paginate,
    };
  },
};
</script>
