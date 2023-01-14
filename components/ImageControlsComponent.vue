<script setup lang="ts">
const emit = defineEmits([
  'handle-delete-image',
  'handle-download-image',
  'toggle-modal'
])
</script>

<template>
  <div class="f j-end mb-quarter mt-quarter">
    <button
      class="f ai-center icon-button"
      title="Delete selected image"
      type="button"
      @click="emit('handle-delete-image')"
    >
      <CloseIcon />
    </button>
    <button
      class="f ai-center ml-1 icon-button"
      title="Preview selected image"
      type="button"
      @click.stop="emit('toggle-modal')"
    >
      <PreviewIcon />
    </button>
    <button
      class="f ai-center ml-1 icon-button"
      title="Download selected image"
      type="button"
      @click="emit('handle-download-image')"
    >
      <DownloadIcon />
    </button>
  </div>
</template>

<style scoped>
.icon-button {
  background-color: transparent;
  height: calc(var(--spacer) + var(--spacer-half));
  padding: 0;
}
</style>
