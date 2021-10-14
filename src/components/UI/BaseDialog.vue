<template>
  <teleport to="body">
    <base-backdrop v-if="showDialog" />
    <div
      v-if="showDialog"
      class="
        fixed
        z-50
        bg-white
        w-full
        sm:w-7/12
        md:w-4/12
        lg:w-3/12
        top-20
        left-4
        sm:left-16
        md:left-32
        lg:left-72
        xl:left-35
      "
    >
      <div class="border border-b py-2 text-center">Confirm Action</div>
      <div class="border border-b py-3 text-xs font-light text-center">
        Are you sure about this ?
      </div>
      <div class="py-2 w-9/12 mx-auto space-x-6 sm:ml-12 md:ml-16 lg:ml-20">
        <button
          class="bg-red-400 text-white px-2 rounded-md text-xs font-light"
          @click="deleteItem"
        >
          Ok
        </button>
        <button
          class="bg-blue-400 text-white px-2 rounded-md text-xs font-light"
          @click="toggleDialog"
        >
          No
        </button>
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
