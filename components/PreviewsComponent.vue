<script setup lang="ts">
import { ref } from 'vue'

import type { StoredImage } from '../types'

const emit = defineEmits(['handle-click'])

const props = defineProps<{
  images: StoredImage[];
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
    class="f images-row mt-quarter"
  >
    <div
      v-for="image in props.images"
      :key="image.id"
    >
      <button
        class="image-preview-button"
        type="button"
        @click="emit('handle-click', image.id)"
      >
        <img
          alt="Image preview"
          class="image-preview"
          :src="image.fileLink"
          @load="moveScroll"
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
.image-preview, .image-preview-button {
  max-height: 4vh;
  max-width: 8vw;
}
.image-preview-button {
  background-color: transparent;
  padding: 0;
}
.images-row {
  overflow-x: scroll;
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
</style>
