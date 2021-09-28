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
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const enteredGroup = ref();
    let group = computed(() => store.getters.group);
    let id = computed(() => route.query.id || undefined);
    let isError = ref(false);
    let error = ref("Can't be empty");
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
      validate(enteredGroup.value);
      try {
        if (!isError.value) {
          await store.dispatch("saveGroup", {
            id: id.value,
            name: enteredGroup.value,
          });
          isSuccess.value = true;
        }
      } catch (err) {
        throwError("Something went wrong");
      }
    }
    function validate(name) {
      if (isEmpty(name) || isBlank(name)) {
        throwError(error.value);
      } else isError.value = false;
    }
    function isBlank(str) {
      return /^\s*$/.test(str);
    }
    function isEmpty(str) {
      return !str || str.length === 0;
    }
    function throwError(message) {
      isError.value = true;
      error.value = message;
    }
    return { enteredGroup, saveGroup, isError, isSuccess, error };
  },
};
</script>
