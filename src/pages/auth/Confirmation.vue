<template>
  <base-form-card class="border-2 border-blue-200 my-16 mx-auto">
    <p v-if="isError" class="text-red-500 text-center">{{ error }}</p>
    <p v-else-if="isSuccess">
      {{ success }}
    </p>
  </base-form-card>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const success = ref("Successfully Confirmed Email");
    const isSuccess = ref();
    const isError = ref();
    const error = ref();

    const confirmation = reactive({
      token: route.query.token,
      userId: +route.query.userId,
    });
    console.log(confirmation);
    async function confirmToken() {
      try {
        await store.dispatch("confirmEmailToken", confirmation);
        isSuccess.value = true;
      } catch (err) {
        if (err.response) {
          throwError(err.response.data.errorMessage);
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
