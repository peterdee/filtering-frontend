<script setup lang="ts">
import 'common-styles/styles.css'

const AVAILABLE_FILTERS = [
  {
    name: 'Grayscale',
    value: 'grayscale'
  },
  {
    name: 'Sobel filter',
    value: 'sobel'
  }
]

interface ComponentState {
  selectedFilter: string;
  selectedImage: File | null;
  selectedImageLink: string;
}

const state = reactive<ComponentState>({
  selectedFilter: AVAILABLE_FILTERS[0].value,
  selectedImage: null,
  selectedImageLink: ''
})

onBeforeUnmount((): void => {
  URL.revokeObjectURL(state.selectedImageLink)
})

const handleClear = (): void => {
  URL.revokeObjectURL(state.selectedImageLink)
  state.selectedImage = null
  state.selectedImageLink = ''
}

const handleInput = (event: Event): null | void => {
  const { files } = event.target as HTMLInputElement
  if (!(files && files.length > 0)) {
    return null
  }
  state.selectedImage = files[0]
  state.selectedImageLink = URL.createObjectURL(files[0])
}

const handleSelect = (event: Event): void => {
  state.selectedFilter = (event.target as HTMLSelectElement).value
}

const handleSubmit = (): void => {
  console.log(state.selectedImage, state.selectedFilter)
}
</script>

<template>
  <div class="f d-col j-space-between wrap">
    <main class="f d-col">
      <div v-if="!state.selectedImage">
        <input
          accept="image/png, image/jpg"
          name="fileSelection"
          type="file"
          @input="handleInput"
        >
      </div>
      <div
        v-if="state.selectedImage"
        class="f d-col"
      >
        <div class="image">
          <img
            alt="Selected image"
            class="image"
            :src="state.selectedImageLink"
          >
        </div>
        <select @change="handleSelect">
          <option
            v-for="option in AVAILABLE_FILTERS"
            :value="option.value"
          >
            {{ option.name }}
          </option>
        </select>
        <button
          type="button"
          @click="handleSubmit"
        >
          Apply filter
        </button>
        <button
          type="button"
          @click="handleClear"
        >
          Clear
        </button>
      </div>
    </main>
    <footer class="f ai-center j-center ns">
      <span>
        2022, Peter Dyumin
      </span>
    </footer>
  </div>
</template>

<style scoped>
footer {
  font-size: calc(var(--spacer) - var(--spacer-quarter));
  height: calc(var(--spacer) * 2);
  width: 100%;
}
.image {
  height: 400px;
  width: 400px;
}
.wrap {
  min-height: 100vh;
  width: 100%;
}
</style>
