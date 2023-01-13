<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import useClickOutside from '../utilities/use-click-outside'

defineProps<{
  imageLink: string;
}>()

const emit = defineEmits([
  'handle-download',
  'toggle-modal'
])

const componentRef = ref<HTMLDivElement | null>(null)

useClickOutside<HTMLDivElement>(
  componentRef as Ref<HTMLDivElement>,
  (): void => emit('toggle-modal')
)
</script>

<template>
  <div
    class="f d-col j-center ns modal-background"
  >
    <div class="modal-tint" />
    <div
      ref="componentRef"
      class="mh-auto image-wrap"
    >
      <img
        alt="Preview"
        class="image"
        :src="imageLink"
      >
    </div>
  </div>
</template>

<style scoped>
.close {
  background-color: transparent;
  border-radius: 50%;
  height: calc(var(--spacer) * 3 + var(--spacer-half));
  padding: 0;
  width: calc(var(--spacer) * 3 + var(--spacer-half));
}
.close:hover {
  background-color: var(--accent-light);
}
.modal-background, .modal-tint {
  backdrop-filter: blur(var(--spacer-quarter));
  background-color: transparent;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
}
.modal-tint {
  background-color: #000000;
  opacity: .5;
}
.modal-content {
  position: fixed;
}
.image, .image-wrap {
  max-height: 100vh;
  max-width: 100vw;
  min-width: calc(var(--spacer) * 15);
}
.image-wrap {
  z-index: 11;
}
</style>
