<template>
  <teleport to="body">
    <base-backdrop v-if="showDialog" />
    <div
      v-if="showDialog"
      class="
        fixed
        z-50
        sm:w-3/5
        md:w-1/3
        lg:w-1/4
        xl:w-1/5
        bg-blue-100
        rounded-lg
        shadow-lg
        sm:left-30
        md:left-35
        lg:left-40
        top-16
      "
    >
      <header class="text-left text-sm">
        Are you sure you want to delete this item?
      </header>
      <div class="border-t border-indigo-200">
        <div class="py-4 mx-auto flex w-1/2 gap-8 text-white text-medium">
          <div class="bg-indigo-500 rounded-md px-1"><button @click.prevent="deleteItem">Yes</button></div>
          <div class="bg-red-400 rounded-md px-1"><button @click.prevent="toggleDialog">No</button></div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: ["showDialog", "deleteItem", "toggleDialog"],
};
</script>

<style></style>
