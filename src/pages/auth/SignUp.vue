<template>
  <div class="mx-auto w-2/5 mt-10">
    <div class="font-bold text-lg w-2/5 mx-auto py-4">Sign Up</div>
    <form class="w-2/3 mx-auto" @submit.prevent="save">
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
      <p v-if="isError" class="text-xs text-red-500">{{ error }}</p>
      <p v-if="isSuccess" class="text-xs text-green-500">
        {{ success }}
      </p>
      <div class="py-3 mx-auto w-5/6">
        <base-button class="px-14">Sign Up</base-button>
      </div>
    </form>

    <div class="w-1/4 mx-72">
      <router-link class="text-center hover:text-green-400" to="/login"
        >Login</router-link
      >
    </div>
  </div>
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
    const passwordPattern = ref(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );
    const success = ref("A confirmation email has been sent");
    let isError = ref();
    let isSuccess = ref();
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
        if (err.response) {
          const errorMessage = err.response.data.errorMessage;
          check409Error(errorMessage);
          check422Error(errorMessage);
          check400Error(errorMessage);
        }
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

    function check409Error(err) {
      if (err.response.status === 409) throwError(err);
    }
    function check422Error(err) {
      if (err.response.status === 422) throwError(err);
    }
    function check400Error(err) {
      if (err.response.status === 400) throwError(err);
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
