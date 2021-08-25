<template>
  <div class="flex px-4 py-4">
    <div class="w-1/4 py-2">
      <label class="font-bold">{{ label }} </label>
    </div>
    <div class="w-3/4">
      <input class="form-input" :value="value" :type="type" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "type", "label"],
};
</script>
