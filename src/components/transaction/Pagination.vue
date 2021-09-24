<template>
  <ul class="flex gap-x-5">
    <li>
      <router-link v-if="prev" @click="prevPage" to="">Previous</router-link>
    </li>

    <li v-for="pageNumber in paginate" :key="pageNumber" class="border-2">
      <router-link
        :class="{ 'bg-green-100': isCurrentPage(pageNumber) }"
        to=""
        @click="changePage(pageNumber)"
        v-if="outRange(pageNumber)"
      >
        {{ pageNumber }}
      </router-link>
    </li>

    <li>
      <router-link v-if="next" @click="nextPage" to="">Next</router-link>
    </li>
  </ul>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  props: ["pageInfo"],
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const totalPages = ref(props.pageInfo.totalPages);
    const page = computed(() => +route.query.page);
    const size = computed(() => +route.query.size);
    let startPage = 1;
    let endPage = 5;
    const prev = computed(() => {
      return page.value - 1 > 0;
    });
    const next = computed(() => {
      return page.value + 1 <= totalPages.value;
    });
    function nextPage() {
      router.push({ query: { page: page.value + 1, size: size.value } });
    }
    function prevPage() {
      router.push({ query: { page: page.value - 1, size: size.value } });
    }
    function changePage(pageNumber) {
      router.push({
        query: { page: pageNumber, size: size.value },
      });
    }
    function outRange(pageNumber) {
      return pageNumber <= totalPages.value;
    }
    function isCurrentPage(pageNumber) {
      return page.value == pageNumber;
    }

    const paginate = computed(() => {
      if (totalPages.value <= 5) {
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
      prev,
      next,
      nextPage,
      prevPage,
      changePage,
      outRange,
      isCurrentPage,
      paginate,
    };
  },
};
</script>
