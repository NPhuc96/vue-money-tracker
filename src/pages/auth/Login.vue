<template>
  <form class="w-9/12 mx-auto py-2" @submit.prevent="save">
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
    <p v-if="isError" class="text-xs text-red-500">{{ error }}</p>
    <div class="text-xss md:ml-44 lg:ml-52">
      <router-link :to="{ name: 'passwordReset', query: { step: 1 } }"
        >Reset password?
      </router-link>
    </div>
    <base-button>Login </base-button>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { checkError, throwError, isBlank, isEmpty } from "../../common/Error";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const login = reactive({
      email: "",
      password: "",
      router: router,
    });
    let error = ref();
    let isError = ref();
    const errors = reactive({
      wrongCredentails: "Incorrect or User is blocked ",
      isBlank: "Field cant be blank",
    });

    async function save() {
      validate();
      try {
        await store.dispatch("login", login);
      } catch (err) {
        checkError(err, 400, isError, error, errors.wrongCredentails);
      }
    }
    function validate() {
      if (
        isBlank(login.email) ||
        isEmpty(login.email) ||
        isBlank(login.passsword) ||
        isEmpty(login.password)
      )
        throwError(isError, error, errors.isBlank);
    }

    return { isError, error, save, login };
  },
};
</script>

<style></style>
