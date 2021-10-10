<template>
  <form class="w-2/3 mx-auto py-2" @submit.prevent="save">
    <base-input
      type="text"
      placeHolder="enter email"
      v-model:value.trim="login.email"
    />
    <base-input
      type="password"
      placeHolder="enter password"
      v-model:value.trim="login.password"
    />
    <div class="text-xs py-2">
      <p v-if="isError" class="text-red-500">{{ error }}</p>
      <div class="font-thin ml-20">
        <router-link :to="{ name: 'passwordReset', query: { step: 1 } }"
          >Reset password?
        </router-link>
      </div>
    </div>
    <base-button>Login </base-button>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const login = reactive({
      email: "",
      password: "",
      router: router,
    });
    const error = ref();
    const errors = reactive({
      wrongCredentails: "Email or password is incorrect",
      invaild: "User is blocked",
    });
    const isError = ref();

    async function save() {
      validate();
      try {
        await store.dispatch("login", login);
      } catch (err) {
        if (err.response) {
          checkError400(err);
          checkError403(err);
        }
      }
    }

    function validate() {
      if (login.email === "" || login.passsword === "")
        throwError("Field cant be blank");
    }
    function checkError400(err) {
      if (err.response.status === 400) throwError(errors.invaild);
    }

    function checkError403(err) {
      if (err.response.status === 403) throwError(errors.wrongCredentails);
    }

    function throwError(errorMessage) {
      isError.value = true;
      error.value = errorMessage;
    }
    return { isError, error, save, login };
  },
};
</script>

<style></style>
