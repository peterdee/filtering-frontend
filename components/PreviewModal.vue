<script setup lang="ts">
import { ref, type Ref } from 'vue'

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
  background-color: var(--text);
  opacity: .5;
}
.image, .image-wrap {
  max-height: 100vh;
  max-width: 100vw;
  min-width: calc(var(--spacer) * 15);
}
.image {
  box-shadow: 0 0 var(--spacer) var(--spacer-quarter) var(--text);
}
.image-wrap {
  z-index: 11;
}
</style>
