<template>
  <div class="py-2 ">
    <input
      :type="type"
      class=" focus:outline-none box-border w-full"
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
