<template>
  <div class="py-1.5 ">
    <input
      :type="type"
      class=" focus:outline-none box-border w-full bg-blue-100 border-b border-indigo-300"
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
