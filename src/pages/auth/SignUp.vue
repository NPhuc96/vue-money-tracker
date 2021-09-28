<template>
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

export default {
  setup() {
    const store = useStore();
    const emailPattern = ref(
      /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/
    );
    const passwordPattern = ref(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    const success = ref("A confirmation email has been sent");
    let isError = ref(false);
    let isSuccess = ref(false);
    let error = ref();

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
        await store.dispatch("signup", signup);
        isSuccess.value = true;
      } catch (err) {
        checkError(err);
      }
    }

    function validateEmail() {
      if (!emailPattern.value.test(signup.email))
        throwError(errors.email.invalid);
    }

    function validatePassword() {
      checkPasswordPattern();
      checkMatchingPassword();
    }

    function checkPasswordPattern() {
      if (!passwordPattern.value.test(signup.password))
        throwError(errors.password.invalid);
    }

    function checkMatchingPassword() {
      if (!(signup.password === signup.matchingPassword))
        throwError(errors.password.confirmation);
    }

    function checkError(err) {
      console.log(err.response);
      if (err.response.status >= 400) {
        throwError(err.response.data.errorMessage);
      }
    }
    function throwError(errorMessage) {
      isError.value = true;
      error.value = errorMessage;
    }

    return { signup, save, error, isError, success, isSuccess };
  },
};
</script>

<style></style>
