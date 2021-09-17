<template>
  <base-card class="mx-auto w-2/5 mt-10">
    <div class="font-bold text-lg w-1/3 mx-auto py-4">Login</div>
    <form class="w-2/3 mx-auto" @submit.prevent="save">
      <base-input
        type="email"
        placeHolder="enter email"
        v-model:value.trim="login.email"
      />

      <base-input
        type="password"
        placeHolder="enter password"
        v-model:value.trim="login.password"
      />
      <p v-if="isError" class="text-xs text-red-500">{{ error }}</p>
      <div class="py-3 mx-auto w-5/6">
        <base-button class="px-16">Login </base-button>
      </div>
    </form>

    <div class="w-1/4 mx-72">
      <router-link class="text-center hover:text-green-400" to="/signup"
        >SignUp</router-link
      >
    </div>
  </base-card>
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
      router : router
    });
    const error = ref("");
    const errors = reactive({
      wrongCredentails: "Email or password is incorrect",
      invaild: "User is blocked",
    });
    const isError = ref(null);

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
