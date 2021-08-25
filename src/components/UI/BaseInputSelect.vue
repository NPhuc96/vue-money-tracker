<template>
  <div class="flex px-4 py-4">
    <div class="w-1/4 py-2">
      <label class="font-bold">{{ label }}</label>
    </div>
    <div class="w-3/4">
      <select :value="groupSelected" class="form-select">
        <option disabled value="">Please select one</option>
        <option v-for="option in options" :key="option.id" :value="option">
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: ["groupSelected", "label", "options"],
};
</script>
