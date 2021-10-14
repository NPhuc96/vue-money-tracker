<template>
  <base-form-card class="border-2 border-blue-200 my-16 mx-auto text-center">
    <p v-if="isError" class="text-red-500">{{ error }}</p>
    <p v-else-if="isSuccess">
      {{ success }}
    </p>
  </base-form-card>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
import { checkError, toggleInfo } from "../../common/Error";

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
    async function confirmToken() {
      try {
        await store.dispatch("confirmEmailToken", confirmation);
        toggleInfo(isError, isSuccess);
      } catch (err) {
        checkError(err, 400, isError, error, err.response.data.errorMessage);
      }
    }

    confirmToken();
    return { error, isError, confirmToken, success, isSuccess };
  },
};
</script>

<style></style>
