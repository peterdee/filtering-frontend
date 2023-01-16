<script setup lang="ts">
defineProps<{
  imageLink: string;
}>()

const emit = defineEmits(['toggle-modal'])
</script>

<template>
  <div
    class="image"
    @dblclick="emit('toggle-modal')"
  >
    <img
      alt="Selected image"
      class="image"
      :src="imageLink"
    >
  </div>
</template>

<style scoped>
.image {
  max-height: 50vh;
  max-width: calc(100vw - (var(--spacer) * 2));
}
</style>
