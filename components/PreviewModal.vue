<script setup lang="ts">
import { ref, type Ref } from 'vue'

import formatSize from '../utilities/format-size'
import useClickOutside from '../utilities/use-click-outside'

defineProps<{
  appliedFilter: string;
  imageDimensions: {
    height: number;
    width: number;
  };
  imageLink: string;
  imageSize: number;
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
      class="flex j-center ai-center mh-auto image-wrap"
    >
      <div class="f d-col ns info">
        <div class="info-text">
          {{ `File size: ${formatSize(imageSize)}` }}
        </div>
        <div class="mt-half info-text">
          {{ `Dimensions: ${imageDimensions.width}x${imageDimensions.height} px` }}
        </div>
        <div
          v-if="appliedFilter !== 'original'"
          class="mt-half info-text"
        >
          {{ `Last applied filter: ${appliedFilter}` }}
        </div>
      </div>
      <div class="f j-end controls">
        <button
          class="control-button"
          title="Download"
          type="button"
          @click="emit('handle-download')"
        >
          <DownloadIcon
            :color="'black'"
            :size="32"
          />
        </button>
        <button
          class="f j-center ai-center ml-1 control-button"
          title="Close"
          type="button"
          @click="emit('toggle-modal')"
        >
          <CloseIcon
            :color="'black'"
            :size="24"
          />
        </button>
      </div>
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
  min-height: calc(var(--spacer) * 25);
  min-width: calc(var(--spacer) * 25);
  z-index: 11;
}
.controls, .info {
  position: absolute;
  top: calc(var(--spacer) * 2);
}
.controls {
  right: calc(var(--spacer) * 3);
}
.info {
  background-color: transparent;
  border-radius: var(--spacer);
  left: calc(var(--spacer) * 3);
  opacity: .5;
  padding: var(--spacer);
  transition: background-color var(--transition) ease-out, opacity var(--transition) ease-out;
}
.info-text {
  font-size: calc(var(--spacer) - var(--spacer-quarter));
}
.control-button {
  background-color: transparent;
  border-radius: 50%;
  height: calc(var(--spacer) * 3);
  opacity: .5;
  padding: 0;
  transition: background-color var(--transition) ease-out, opacity var(--transition) ease-out;
  width: calc(var(--spacer) * 3);
}
.control-button:hover, .info:hover {
  background-color: var(--background);
  opacity: .7;
  transition: background-color var(--transition) ease-in, opacity var(--transition) ease-in;
}
</style>
