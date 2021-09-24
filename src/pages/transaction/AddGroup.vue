<template>
  <form @submit.prevent="saveGroup" class="w-2/3 mx-auto py-4">
    <base-input
      type="text"
      placeHolder="New group"
      v-model:value.trim="enteredGroup"
    />
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

    function saveGroup() {
      store.dispatch("saveGroup", { id: id.value, name: enteredGroup.value });
      store.dispatch("forceUpdate", +1);
      getGroup();
    }
    return { enteredGroup, saveGroup };
  },
};
</script>
