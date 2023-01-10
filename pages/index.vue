<script setup lang="ts">
import axios from 'axios'
import 'common-styles/styles.css'

import filters, { Filter } from '../utilities/filter-list'

interface StoredImage {
  file: File;
  fileLink: string;
}

interface ComponentState {
  grayscaleType: string;
  loading: boolean;
  selectedFilter: Filter;
  selectedImage: File | null;
  selectedImageLink: string;
  selectedImageName: string;
  storedImages: StoredImage[];
  thresholdValue: number;
}

const state = reactive<ComponentState>({
  grayscaleType: '',
  loading: false,
  selectedFilter: filters[0],
  selectedImage: null,
  selectedImageLink: '',
  selectedImageName: '',
  storedImages: [],
  thresholdValue: 0
})

onBeforeUnmount((): void => {
  URL.revokeObjectURL(state.selectedImageLink)

  state.storedImages.forEach((storedImage: StoredImage): void => {
    URL.revokeObjectURL(storedImage.fileLink)
  })
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

  state.storedImages.push({
    file: files[0],
    fileLink: state.selectedImageLink
  })
}

const handleGrayscaleSelection = (event: Event): void => {
  const { value } = event.target as HTMLSelectElement
  state.grayscaleType = value
}

const handleRangeInput = (event: Event): void => {
  const { value } = event.target as HTMLSelectElement
  state.thresholdValue = Number(value)
}

const handleSelectFilter = (event: Event): void => {
  const { value } = event.target as HTMLSelectElement
  state.selectedFilter = filters.filter(
    (filter: Filter): boolean => filter.value === value
  )[0]
  state.thresholdValue = state.selectedFilter.thresholdDefault
}

const handleThresholdInput = (event: Event): null | void => {
  const { value } = event.target as HTMLInputElement
  state.thresholdValue = Number(value)
}

const handleSubmit = async (): Promise<null | void> => {
  const {
    grayscaleType,
    selectedFilter,
    selectedImage,
    selectedImageName,
    thresholdValue
  } = state
  if (!(selectedFilter && selectedImage)) {
    // TODO: error message
    return null
  }

  state.loading = true

  const formData = new FormData()
  formData.append('filter', selectedFilter.value)
  formData.append('image', selectedImage, selectedImageName)

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

    const processedImageLink = URL.createObjectURL(response.data)

    state.selectedImage = response.data
    state.selectedImageLink = processedImageLink
    state.storedImages.push({
      file: response.data,
      fileLink: processedImageLink
    })

    state.loading = false
  } catch (error) {
    state.loading = false
    console.log(error)
  }
}
</script>

<template>
  <div class="f d-col wrap">
    <main class="f d-col ai-center j-center">
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
        <div v-if="state.selectedFilter && state.selectedFilter.value === 'grayscale'">
          <select @change="handleGrayscaleSelection">
            <option value="average">
              Average
            </option>
            <option value="luminocity">
              Luminocity
            </option>
          </select>
        </div>
        <div v-if="state.selectedFilter && state.selectedFilter.withThreshold">
          <div v-if="state.selectedFilter.controlType === 'range'">
            <RangeComponent
              :handle-range-input="handleRangeInput"
              :selected-filter="state.selectedFilter"
              :threshold-value="state.thresholdValue"
            />
          </div>
          <div v-if="state.selectedFilter.controlType === 'input'">
            <input
              class="mt-1"
              placeholder="Blur amount"
              type="number"
              :min="state.selectedFilter.thresholdMin"
              :value="state.thresholdValue"
              @input="handleThresholdInput"
            >
          </div>
        </div>
        <button
          class="mt-1"
          type="button"
          @click="handleSubmit"
        >
          Apply filter
        </button>
        <button
          class="mt-1"
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
main {
  min-height: calc(100vh - var(--spacer) * 3);
}
.image {
  max-height: 70vh;
  max-width: 90vw;
}
.wrap {
  min-height: 100vh;
  width: 100%;
}
</style>
