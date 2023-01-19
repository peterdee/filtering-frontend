<script setup lang="ts">
import { ref, type Ref } from 'vue'

import useClickOutside from '../utilities/use-click-outside'

defineProps<{
  message: string
}>()

const emit = defineEmits([
  'toggle-modal'
])

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
      class="flex j-center ai-center d-col mh-auto ns content"
    >
      <h2 class="title">
        Error!
      </h2>
      <div class="mt-1">
        {{ message }}
      </div>
      <button
        class="mt-1 control"
        type="button"
        @click="emit('toggle-modal')"
      >
        Ok
      </button>
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
  max-height: calc(var(--spacer) * 20);
  max-width: calc(var(--spacer) * 30);
  min-height: calc(var(--spacer) * 10);
  min-width: calc(var(--spacer) * 15);
  padding: var(--spacer);
  width: 50%;
  z-index: 11;
}
.title {
  color: var(--error);
  font-weight: 300;
}
.control {
  background-color: var(--error);
  width: calc(var(--spacer) * 5);
}
.control:hover {
  background-color: var(--error-light);
}
</style>
