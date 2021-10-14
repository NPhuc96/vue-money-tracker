<template>
  <base-backdrop v-if="isLoading" />
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
import {
  checkError,
  throwError,
  isBlank,
  isEmpty,
  toggleInfo,
} from "../../common/Error";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const emailPattern = ref(mail);
    const passwordPattern = ref(password);
    const step = computed(() => +route.query.step || +1);
    let isLoading = ref(false);
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
        blank: "Code can not be blank",
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
      validateEmail();
      try {
        isLoading.value = true;
        await store.dispatch("request", enteredEmail.value);
        setStep(+2);
        isEmailSent.value = true;
      } catch (err) {
        isLoading.value = false;
        checkError(err, 400, isError, error, errors.email.invalid);
      }
      isLoading.value = false;
    }
    async function saveCode() {
      validateCode();
      try {
        await store.dispatch("confirm", {
          email: enteredEmail.value,
          code: entertedCode.value,
        });
        setStep(+3);
        isEmailSent.value = false;
      } catch (err) {
        checkError(err, 400, isError, error, errors.code.invalid);
      }
    }
    async function savePassword() {
      validatePassword();
      try {
        await store.dispatch("changePassword", {
          password: entertedPassword.value,
          email: enteredEmail.value,
        });
        toggleInfo(isError, isSuccess);
      } catch (err) {
        checkError(err, 400, isError, error, errors.password.invalid);
      }
    }
    function setStep(number) {
      router.replace({
        name: "passwordReset",
        query: { step: number, email: enteredEmail.value },
      });
      isError.value = false;
    }
    function validateEmail() {
      if (!emailPattern.value.test(enteredEmail.value)) {
        throwError(isError, error, errors.email.invalid);
      }
    }
    function validatePassword() {
      if (!passwordPattern.value.test(entertedPassword.value)) {
        throwError(isError, error, errors.password.invalid);
      }
    }
    function validateCode() {
      if (isBlank(entertedCode) || isEmpty(entertedCode)) {
        throwError(isError, error, errors.code.blank);
      }
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
      isLoading,
    };
  },
};
</script>
