<script setup lang="ts">
import { ref, type Ref } from 'vue'

import useClickOutside from '../utilities/use-click-outside'

const emit = defineEmits(['toggle-modal'])

const componentRef = ref<HTMLDivElement | null>(null)

useClickOutside<HTMLDivElement>(
  componentRef as Ref<HTMLDivElement>,
  (): void => emit('toggle-modal')
)
</script>

<template>
  <div class="f d-col j-center ns modal-background">
    <div class="modal-tint" />
    <div
      ref="componentRef"
      class="flex d-col mh-auto ns content"
    >
      <div class="f j-space-between ai-center header">
        <div class="empty" />
        <h2 class="title">
          About
        </h2>
        <button
          class="close-button"
          type="button"
          @click="emit('toggle-modal')"
        >
          <CloseIcon :size="16" />
        </button>
      </div>
      <div class="mt-1 text">
        This application is a demo for <a
          href="https://github.com/julyskies/brille"
          target="_blank"
        >Brille</a> image processing module
      </div>
      <div class="mt-half text">
        Frontend application repository: <a
          href="https://github.com/peterdee/filtering-frontend"
          target="_blank"
        >https://github.com/peterdee/filtering-frontend</a>
      </div>
      <div class="mt-half text">
        Backend application repository: <a
          href="https://github.com/peterdee/filtering-backend"
          target="_blank"
        >https://github.com/peterdee/filtering-backend</a>
      </div>
      <div class="mt-1 t-center text">
        <a
          href="https://dyum.in"
          target="_blank"
        >Peter Dyumin</a>, © {{ new Date().getFullYear() }}
      </div>
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
.content {
  background-color: var(--background);
  border-radius: var(--spacer);
  max-width: calc(var(--spacer) * 30);
  min-width: calc(var(--spacer) * 20);
  padding: var(--spacer);
  width: 50%;
  z-index: 11;
}
.header {
  width: 100%;
}
.title {
  font-weight: 300;
}
.empty {
  width: var(--spacer);
}
.close-button {
  background-color: transparent;
  height: var(--spacer);
  opacity: .5;
  padding: 0;
  transition: opacity var(--transition) ease-out;
  width: var(--spacer);
}
.close-button:hover {
  opacity: 1;
  transition: opacity var(--transition) ease-in;
}
.text {
  font-size: var(--spacer);
  font-weight: 300;
}
</style>
