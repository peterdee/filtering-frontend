<script setup lang="ts">
import axios from 'axios'
import 'common-styles/styles.css'

const AVAILABLE_FILTERS = [
  {
    name: 'Emboss filter',
    value: 'emboss'
  },
  {
    name: 'Sobel filter',
    value: 'sobel'
  }
]

interface ComponentState {
  loading: boolean;
  selectedFilter: string;
  selectedImage: File | null;
  selectedImageLink: string;
}

const state = reactive<ComponentState>({
  loading: false,
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

  // TODO: store original file name
}

const handleSelect = (event: Event): void => {
  state.selectedFilter = (event.target as HTMLSelectElement).value
}

const handleSubmit = async (): Promise<null | void> => {
  const { selectedFilter, selectedImage } = state
  if (!(selectedFilter && selectedImage)) {
    // TODO: error message
    return null
  }

  state.loading = true

  const formData = new FormData()
  formData.append('filter', selectedFilter)
  formData.append('image', selectedImage, selectedImage.name)

  try {
    const response = await axios({
      data: formData,
      method: 'POST',
      url: `${useRuntimeConfig().public.BACKEND_URL}/api/processing`
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
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
            :key="option.value"
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
        2022-2023, Peter Dyumin
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
  max-height: 400px;
  max-width: 400px;
}
.wrap {
  min-height: 100vh;
  width: 100%;
}
</style>
