<template>
  <base-backdrop v-if="isLoading" />
  <form class="w-2/3 mx-auto py-2" @submit.prevent="save">
    <base-input
      type="text"
      placeHolder="enter email"
      v-model:value.trim="signup.email"
    />

    <base-input
      type="password"
      placeHolder="enter password"
      v-model:value.trim="signup.password"
    />
    <base-input
      type="password"
      placeHolder="re-enter password"
      v-model:value.trim="signup.matchingPassword"
    />

    <div class="text-xs">
      <p v-if="isError" class="text-red-400">{{ error }}</p>
      <p v-else-if="isSuccess" class="text-green-500">
        {{ success }}
      </p>
    </div>

    <base-button>Register</base-button>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { mail, password } from "../../common/Patterns";
import { checkError, throwError, toggleInfo } from "../../common/Error";

export default {
  setup() {
    const store = useStore();
    const emailPattern = ref(mail);
    const passwordPattern = ref(password);
    const success = ref("A confirmation email has been sent");
    let isError = ref(false);
    let isSuccess = ref(false);
    let error = ref();
    let isLoading = ref(false);

    const errors = reactive({
      email: {
        invalid: "*Please provide a valid email",
        taken: "*Please use a different Email",
      },
      password: {
        invalid: "*Please provide a valid password",
        confirmation: "*Password does not match",
      },
    });

    const signup = reactive({
      email: "",
      password: "",
      matchingPassword: "",
    });

    async function save() {
      validateEmail();
      validatePassword();
      try {
        isLoading.value = true;
        await store.dispatch("signup", signup);
        toggleInfo(isError, isSuccess);
      } catch (err) {
        checkError(err, 400, isError, error, err.response.data.errorMessage);
      }
      isLoading.value = false;
    }

    function validateEmail() {
      if (!emailPattern.value.test(signup.email)) {
        throwError(isError, error, errors.email.invalid);
      }
    }

    function validatePassword() {
      checkPasswordPattern();
      checkMatchingPassword();
    }

    function checkPasswordPattern() {
      if (!passwordPattern.value.test(signup.password))
        throwError(isError, error, errors.password.invalid);
    }

    function checkMatchingPassword() {
      if (!(signup.password === signup.matchingPassword))
        throwError(isError, error, errors.password.confirmation);
    }

    return { signup, save, error, isError, success, isSuccess, isLoading };
  },
};
</script>

<style></style>
