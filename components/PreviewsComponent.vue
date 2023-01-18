<script setup lang="ts">
import { ref } from 'vue'

import type { StoredImage } from '../types'

const emit = defineEmits(['handle-click'])

const props = defineProps<{
  images: StoredImage[];
  selectedImageId: number;
}>()

const scrollRef = ref<HTMLDivElement>()

const moveScroll = (): void => {
  if (scrollRef.value) {
    scrollRef.value.scrollTo({
      left: scrollRef.value.scrollWidth
    })
  }
}
</script>

<template>
  <div
    ref="scrollRef"
    class="f mt-quarter images-row"
  >
    <div
      v-for="image in props.images"
      :key="image.id"
    >
      <button
        class="image-preview-button"
        type="button"
        :title="`${image.appliedFilter === 'original'
          ? 'Original image'
          : `Applied filter: ${image.appliedFilter}`
        }`"
        @click="emit('handle-click', image.id)"
      >
        <img
          alt="Image preview"
          :class="`image-preview ${image.id === selectedImageId ? 'selected' : ''}`"
          :src="image.fileLink"
          @load="moveScroll"
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
.image-preview, .image-preview-button {
  max-height: 5vh;
  max-width: 8vw;
  min-height: calc(var(--spacer) * 2);
  min-width: calc(var(--spacer) * 2);
}
.image-preview {
  border: var(--spacer-quarter) solid transparent;
}
.image-preview-button {
  background-color: transparent;
  padding: 0;
}
.images-row {
  overflow-x: scroll;
  overflow-y: hidden;
}
.images-row::-webkit-scrollbar {
  height: calc(var(--spacer-half) + var(--spacer-quarter));
}
.images-row::-webkit-scrollbar-track {
  background-color: var(--muted-light);
  border-radius: var(--spacer-half);
}
.images-row::-webkit-scrollbar-thumb {
  background-color: var(--accent);
  border-radius: var(--spacer-half);
}
.selected {
  border: var(--spacer-quarter) solid var(--accent-light);
}
</style>
