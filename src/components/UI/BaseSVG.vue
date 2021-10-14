<template>
  <svg
    class="opacity-70 w-10 h-10 hover:fill-current text-blue-500"
    :class="{ 'fill-current text-blue-500': isCurrentRoute }"
    :viewBox="viewBox"
  >
    <slot />
  </svg>
</template>

<script>
export default {
  props: ["isCurrentRoute", "viewBox"],
};
</script>
