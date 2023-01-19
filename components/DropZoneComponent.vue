<script setup lang="ts">
const emit = defineEmits(['handle-file'])

const handleFileDrop = (event: DragEvent): null | void => {
  const { dataTransfer } = event
  if (!dataTransfer) {
    return null
  }
  const { files } = dataTransfer
  if (!(files && files[0])) {
    return null
  }
  return emit('handle-file', files[0])
}

const handleFileSelection = (): void => {
  const input = document.createElement('input')
  input.accept = 'image/jpeg, image/png'
  input.type = 'file'
  input.oninput = (event: Event): null | void => {
    const { files } = event.target as HTMLInputElement
    if (!(files && files[0])) {
      return null
    }
    return emit('handle-file', files[0])
  }
  input.click()
}
</script>

<template>
  <h2 class="ns mh-1 t-center title">
    Images: a demo for <a
      href="https://github.com/julyskies/brille"
      target="_blank"
    >Brille</a> module
  </h2>
  <button
    class="f j-center ai-center mt-1 ns zone"
    @click="handleFileSelection"
    @dragover.prevent
    @drop.prevent="handleFileDrop"
  >
    Drop file here or click to open
  </button>
</template>

<style scoped>
.title {
  font-weight: 300;
}
.zone {
  background-color: transparent;
  border: calc(var(--spacer-quarter) / 2) dotted var(--accent);
  color: var(--accent);
  font-size: var(--spacer);
  height: 60vh;
  min-height: calc(var(--spacer) * 15);
  min-width: calc(var(--spacer) * 15);
  transition: border var(--transition) ease-out,
    box-shadow var(--transition) ease-out;
  width: 60vw;
}
.zone:hover {
  border: calc(var(--spacer-quarter) / 2) dotted var(--accent-light);
  box-shadow: 0 0 var(--spacer-half) var(--spacer-quarter) var(--accent-light);
  transition: border var(--transition) ease-in,
    box-shadow var(--transition) ease-in;
}
</style>
