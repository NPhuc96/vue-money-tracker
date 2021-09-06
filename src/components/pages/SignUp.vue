<template>
  <base-card class="mx-auto w-2/5 mt-10">
    <div class="font-bold text-lg w-2/5 mx-auto py-4">Sign Up Form</div>
    <form class="w-2/3 mx-auto" @submit.prevent="saveData">
      <base-input
        type="text"
        placeHolder="enter email"
        v-model:value.trim="signupData.email"
      />

      <base-input
        type="password"
        placeHolder="enter password"
        v-model:value.trim="signupData.password"
      />
      <base-input
        type="password"
        placeHolder="re-enter password"
        v-model:value.trim="signupData.matchingPassword"
      />
      <p v-if="!!formIsValid" class="text-xs text-red-500">{{ error }}</p>
      <p v-if="success" class="text-xs text-green-500">
        A confirmation email has been sent
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
  </base-card>
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
    let formIsValid = ref(true);
    let error = ref(null);
    let success = ref(false);

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

    const signupData = reactive({
      email: "",
      password: "",
      matchingPassword: "",
    });

    function checkEmailPattern() {
      console.log("Valid email : " + emailPattern.value.test(signupData.email));
      if (!emailPattern.value.test(signupData.email)) {
        error.value = errors.email.invalid;
        return false;
      }
      return true;
    }

    function validatePassword() {
      console.log(
        "Valid password : " + passwordPattern.value.test(signupData.password)
      );
      if (!passwordPattern.value.test(signupData.password)) {
        error.value = errors.password.invalid;
        return false;
      } else {
        if (!(signupData.password === signupData.matchingPassword)) {
          error.value = errors.password.confirmation;
          return false;
        }
        return true;
      }
    }

    async function saveData() {
      if (checkEmailPattern() && validatePassword()) {
        try {
          await store.dispatch("signup", signupData);
          success.value = true;
        } catch (err) {
          formIsValid = false;
          console.log(err.message);
          if (err.response.status === 409) {
            error.value = errors.email.taken;
          } else error.value = "Error in server";
        }
      }
    }

    return { signupData, saveData, error, formIsValid, success };
  },
};
</script>

<style></style>
