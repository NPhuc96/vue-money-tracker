<template>
  <form class="w-2/3 mx-auto py-2" @submit.prevent="save">
    <base-input
      v-if="step == 1"
      type="text"
      placeHolder="email"
      v-model:value.trim="enteredEmail"
    />
    <base-input
      v-else-if="step == 2"
      type="text"
      placeHolder="code"
      v-model:value.trim="entertedCode"
    />
    <base-input
      v-else-if="step == 3"
      type="password"
      placeHolder="New Password"
      v-model:value.trim="entertedPassword"
    />
    <div class="text-xs py-2">
      <p class="text-red-500" v-if="isError">{{ error }}</p>
      <p v-else-if="isEmailSent">*Please check your email</p>
      <p v-else-if="isSuccess">Your password had been changed</p>
    </div>
    <base-button>Send </base-button>
  </form>
</template>

<script>
import { mail, password } from "../../common/Patterns";
import { reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const emailPattern = ref(mail);
    const passwordPattern = ref(password);
    const step = computed(() => +route.query.step || +1);
    let enteredEmail = ref(route.query.email || "");
    let entertedCode = ref("");
    let entertedPassword = ref("");
    let isError = ref(false);
    let isSuccess = ref(false);
    let isEmailSent = ref(false);
    let error = ref();

    const errors = reactive({
      email: {
        invalid: "*Please provide a valid email",
      },
      code: {
        invalid: "*Invalid Code or Used",
      },
      password: {
        invalid: "*Please provide a valid password",
      },
    });

    function save() {
      if (step.value == 1) {
        saveEmail();
      } else if (step.value == 2) {
        saveCode();
      } else if (step.value == 3) {
        savePassword();
      }
    }
    async function saveEmail() {
      if (validateEmail()) {
        try {
          await store.dispatch("request", enteredEmail.value);
          setStep(+2);
          isEmailSent.value = true;
        } catch (err) {
          if (err.response) checkError(err, errors.email.invalid);
        }
      }
    }
    async function saveCode() {
      try {
        await store.dispatch("confirm", {
          email: enteredEmail.value,
          code: entertedCode.value,
        });
        setStep(+3);
        isEmailSent.value = false;
      } catch (err) {
        if (err.response) checkError(err, errors.code.invalid);
      }
    }
    async function savePassword() {
      if (validatePassword()) {
        try {
          await store.dispatch("changePassword", {
            password: entertedPassword.value,
            email: enteredEmail.value,
          });
          isSuccess.value = true;
        } catch (err) {
          if (err.response) checkError(err, errors.password.invalid);
        }
      }
    }
    function setStep(number) {
      router.replace({
        name: "passwordReset",
        query: { step: number, email: enteredEmail.value },
      });
    }
    function validateEmail() {
      if (!emailPattern.value.test(enteredEmail.value)) {
        throwError(errors.email.invalid);
        return false;
      }
      return true;
    }
    function validatePassword() {
      if (!passwordPattern.value.test(entertedPassword.value)) {
        throwError(errors.password.invalid);
        return false;
      }
      return true;
    }
    function checkError(err, errorMessage) {
      if (err.response.status >= 400) {
        throwError(errorMessage);
      }
    }
    function throwError(errorMessage) {
      isError.value = true;
      error.value = errorMessage;
    }
    return {
      save,
      enteredEmail,
      entertedCode,
      entertedPassword,
      isError,
      isSuccess,
      isEmailSent,
      step,
      error,
    };
  },
};
</script>
