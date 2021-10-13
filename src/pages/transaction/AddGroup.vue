<template>
  <form @submit.prevent="saveGroup" class="w-2/3 mx-auto py-4">
    <base-input
      type="text"
      placeHolder="New group"
      v-model:value.trim="enteredGroup"
    />
    <div class="text-xs">
      <p class="text-red-400" v-if="isError">
        {{ error }}
      </p>
      <p class="text-green-500" v-else-if="isSuccess">Saved</p>
    </div>
    <base-button type="submit">Save</base-button>
  </form>
</template>

<script>
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
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
    const enteredGroup = ref();
    let group = computed(() => store.getters.group);
    let id = computed(() => route.query.id || undefined);
    let isError = ref(false);
    let error = ref();
    const errors = reactive({
      blank: "Can't be empty",
      server: "Something went wrong",
    });
    let isSuccess = ref(false);

    getGroup();
    async function getGroup() {
      if (id.value !== undefined) {
        await store.dispatch("getGroup", id.value);
        fillData();
      }
    }

    function fillData() {
      if (group.value) {
        enteredGroup.value = group.value.name;
      }
    }

    async function saveGroup() {
      validate();
      try {
        await store.dispatch("saveGroup", {
          id: id.value,
          name: enteredGroup.value,
        });
        toggleInfo(isError, isSuccess);
      } catch (err) {
        checkError(err, 400, isError, error, errors.server);
      }
    }
    function validate() {
      if (isEmpty(enteredGroup.value) || isBlank(enteredGroup.value)) {
        throwError(isError, error, errors.blank);
      }
    }

    return { enteredGroup, saveGroup, isError, isSuccess, error };
  },
};
</script>
