<template>
  <div class="mx-auto w-2/5 mt-10">
    <p v-if="isError" class="text-red-500 text-center">{{ error }}</p>
    <p v-else-if="isSuccess" class="text-green-500 text-center">
      {{ success }}
    </p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const success = ref("Successfully Confirmed Email");
    const isSuccess = ref();
    const isError = ref();
    const error = ref();

    const confirmation = {
      token: route.query.token,
      email: route.query.email,
    };

    async function confirmToken() {
      try {
        await store.dispatch("confirmEmailToken", confirmation);
        isSuccess.value = true;
      } catch (err) {
        if (err.response) {
          const errorMessage = err.response.data.errorMessage;
          throwError(errorMessage);
        }
      }
    }

    function throwError(errorMessage) {
      isError.value = true;
      error.value = errorMessage;
    }
    confirmToken();
    return { error, isError, confirmToken, success, isSuccess };
  },
};
</script>

<style></style>
