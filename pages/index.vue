<script setup lang="ts">
import axios from 'axios'
import 'common-styles/styles.css'

import filters, { Filter } from '../utilities/filter-list'

interface ComponentState {
  grayscaleType: string;
  loading: boolean;
  selectedFilter: Filter;
  selectedImage: File | null;
  selectedImageLink: string;
  selectedImageName: string;
  thresholdValue: number;
}

const state = reactive<ComponentState>({
  grayscaleType: '',
  loading: false,
  selectedFilter: filters[0],
  selectedImage: null,
  selectedImageLink: '',
  selectedImageName: '',
  thresholdValue: 0
})

onBeforeUnmount((): void => {
  URL.revokeObjectURL(state.selectedImageLink)
})

const handleClear = (): void => {
  URL.revokeObjectURL(state.selectedImageLink)
  state.selectedImage = null
  state.selectedImageLink = ''
}

const handleFileInput = (event: Event): null | void => {
  const { files } = event.target as HTMLInputElement
  if (!(files && files.length > 0)) {
    return null
  }
  state.selectedImage = files[0]
  state.selectedImageLink = URL.createObjectURL(files[0])
  state.selectedImageName = files[0].name
}

const handleSelectFilter = (event: Event): void => {
  const { value } = event.target as HTMLSelectElement
  state.selectedFilter = filters.filter(
    (filter: Filter): boolean => filter.value === value
  )[0]
  state.thresholdValue = state.selectedFilter.thresholdDefault
}

const handleSubmit = async (): Promise<null | void> => {
  const {
    grayscaleType,
    selectedFilter,
    selectedImage,
    thresholdValue
  } = state
  if (!(selectedFilter && selectedImage)) {
    // TODO: error message
    return null
  }

  state.loading = true

  const formData = new FormData()
  formData.append('filter', selectedFilter.value)
  formData.append('image', selectedImage, selectedImage.name)

  if (selectedFilter.value === 'grayscale') {
    formData.append('grayscaleType', grayscaleType)
  }
  if (selectedFilter.withThreshold) {
    formData.append('threshold', `${thresholdValue}`)
  }

  try {
    const response = await axios({
      data: formData,
      method: 'POST',
      responseType: 'blob',
      url: `${useRuntimeConfig().public.BACKEND_URL}/api/processing`
    })

    state.selectedImageLink = URL.createObjectURL(response.data)

    state.loading = false
  } catch (error) {
    state.loading = false
    console.log(error)
  }
}
</script>

<template>
  <div class="f d-col j-space-between wrap">
    <main class="f d-col">
      <div v-if="state.loading">
        Loading...
      </div>
      <div v-if="!state.selectedImage">
        <input
          accept="image/png, image/jpg"
          name="fileSelection"
          type="file"
          @input="handleFileInput"
        >
      </div>
      <div
        v-if="state.selectedImage && !state.loading"
        class="f d-col"
      >
        <div class="image">
          <img
            alt="Selected image"
            class="image"
            :src="state.selectedImageLink"
          >
        </div>
        <select @change="handleSelectFilter">
          <option
            v-for="option in filters"
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
    <FooterComponent />
  </div>
</template>

<style scoped>
.image {
  max-height: 400px;
  max-width: 400px;
}
.wrap {
  min-height: 100vh;
  width: 100%;
}
</style>
