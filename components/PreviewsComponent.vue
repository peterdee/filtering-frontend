<script setup lang="ts">
import { ref } from 'vue'

import type { StoredImage } from '../types'

const emit = defineEmits(['handle-click'])

const props = defineProps<{
  images: StoredImage[];
}>()

const scrollRef = ref<HTMLDivElement>()

onMounted((): void => {
  if (scrollRef.value) {
    scrollRef.value.scrollTo({
      behavior: 'smooth',
      left: scrollRef.value.scrollWidth + 500
    })
  }
})
</script>

<template>
  <div
    ref="scrollRef"
    class="f images-row"
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
          class="image-preview"
          alt="Image preview"
          :src="image.fileLink"
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
  margin-top: var(--spacer-quarter);
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
