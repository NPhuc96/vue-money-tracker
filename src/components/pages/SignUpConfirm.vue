<template>
  <base-card class="mx-auto w-2/5 mt-10">
    <p v-if="isError" class="text-red-500 text-center">{{ error }}</p>
    <p v-else class="text-green-500 text-center">
      Successfully Confirmed Email
    </p>
  </base-card>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const isError = ref(false);
    const error = ref("");

    const confirmation = {
      token: route.query.token,
      email: route.query.email,
    };

    async function confirmToken() {
      try {
        await store.dispatch("confirmEmailToken", confirmation);
      } catch (err) {
        isError.value = true;
        error.value = err;
      }
    }
    confirmToken();
    return { error, isError, confirmToken };
  },
};
</script>

<style></style>
