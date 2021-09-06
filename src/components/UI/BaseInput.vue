<template>
  <div class="w-1/2 py-2">
    <input
      :type="type"
      class="border-b-2 border-green-100 focus:outline-none box-border w-56 h-6"
      :placeholder="placeHolder"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ["placeHolder", "type", "value"],
};
</script>

<style></style>
