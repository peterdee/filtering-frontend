<script setup lang="ts">
import axios from 'axios'
import 'common-styles/styles.css'

import filters, { Filter } from '../utilities/filter-list'

interface StoredImage {
  file: File;
  fileLink: string;
  id: number;
}

interface ComponentState {
  grayscaleType: string;
  loading: boolean;
  selectedFilter: Filter;
  selectedImage: File | null;
  selectedImageId: number | null;
  selectedImageLink: string;
  selectedImageName: string;
  showPreviewModal: boolean;
  storedImages: StoredImage[];
  thresholdValue: number;
}

const state = reactive<ComponentState>({
  grayscaleType: 'average',
  loading: false,
  selectedFilter: filters[0],
  selectedImage: null,
  selectedImageId: null,
  selectedImageLink: '',
  selectedImageName: '',
  showPreviewModal: false,
  storedImages: [],
  thresholdValue: filters[0].thresholdDefault
})

onBeforeUnmount((): void => {
  URL.revokeObjectURL(state.selectedImageLink)

  state.storedImages.forEach((storedImage: StoredImage): void => {
    URL.revokeObjectURL(storedImage.fileLink)
  })
})

const handleClear = (): void => {
  URL.revokeObjectURL(state.selectedImageLink)

  state.storedImages.forEach((storedImage: StoredImage): void => {
    URL.revokeObjectURL(storedImage.fileLink)
  })

  state.selectedImage = null
  state.selectedImageId = null
  state.selectedImageLink = ''
  state.selectedImageName = ''
  state.storedImages = []
}

const handleDeleteImage = (): void => {
  const { selectedImageId, storedImages } = state
  const storedImagesLength = storedImages.length
  if (storedImagesLength === 1) {
    return handleClear()
  }

  let selectedImageIndex = 0
  for (let i = 0; i < storedImagesLength; i += 1) {
    if (storedImages[i].id === selectedImageId) {
      selectedImageIndex = i
      break
    }
  }

  const nextImageIndex = selectedImageIndex < storedImagesLength - 1
    ? selectedImageIndex + 1
    : selectedImageIndex - 1

  state.selectedImage = state.storedImages[nextImageIndex].file
  state.selectedImageId = state.storedImages[nextImageIndex].id
  state.selectedImageLink = state.storedImages[nextImageIndex].fileLink
  state.storedImages = storedImages.filter(
    (image: StoredImage): boolean => image.id !== selectedImageId
  )
}

const handleDownloadImage = (): void => {
  const link = document.createElement('a')
  link.download = state.selectedImageName
  link.style.display = 'none'
  link.href = state.selectedImageLink
  link.click()
  link.remove()
}

const handleFileInput = (event: Event): null | void => {
  const { files } = event.target as HTMLInputElement
  if (!(files && files.length > 0)) {
    return null
  }
  const file = files[0]
  if (file.size > useRuntimeConfig().public.MAX_FILE_SIZE) {
    // TODO: maximum file size error
    return null
  }

  const id = Date.now()
  state.selectedImage = file
  state.selectedImageId = id
  state.selectedImageLink = URL.createObjectURL(files[0])
  state.selectedImageName = file.name

  if (!state.selectedFilter) {
    state.selectedFilter = filters[0]
    state.thresholdValue = filters[0].thresholdDefault
  }

  state.storedImages.push({
    file,
    fileLink: state.selectedImageLink,
    id
  })
}

const handleGrayscaleSelection = (event: Event): void => {
  const { value } = event.target as HTMLSelectElement
  state.grayscaleType = value
}

const handlePreviewClick = (id: number): void => {
  const [newSelectedImage] = state.storedImages.filter(
    (image: StoredImage): boolean => image.id === id
  )
  state.selectedImage = newSelectedImage.file
  state.selectedImageId = newSelectedImage.id
  state.selectedImageLink = newSelectedImage.fileLink
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

const togglePreviewModal = (): void => {
  state.showPreviewModal = !state.showPreviewModal
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

    const id = Date.now()
    state.selectedImage = response.data
    state.selectedImageId = id
    state.selectedImageLink = processedImageLink
    state.storedImages.push({
      file: response.data,
      fileLink: processedImageLink,
      id
    })

    state.loading = false
  } catch (error) {
    state.loading = false
    console.log(error)
  }
}
</script>

<template>
  <div class="f d-col j-space-between wrap">
    <PreviewModal
      v-if="state.showPreviewModal"
      :image-link="state.selectedImageLink"
      @handle-download="handleDownloadImage"
      @toggle-modal="togglePreviewModal"
    />
    <HeaderComponent />
    <main class="f d-col ai-center j-center">
      <div v-if="state.loading">
        Loading...
      </div>
      <div v-if="!state.selectedImage">
        <input
          accept="image/png|image/jpg"
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
        <div class="f d-col mh-auto controls">
          <div class="f previews">
            <div
              v-for="image in state.storedImages"
              :key="image.id"
            >
              <button
                class="image-preview-button"
                type="button"
                @click="handlePreviewClick(image.id)"
              >
                <img
                  class="image-preview"
                  alt="Image preview"
                  :src="image.fileLink"
                >
              </button>
            </div>
          </div>
          <ImageControlsComponent
            @handle-delete-image="handleDeleteImage"
            @handle-download-image="handleDownloadImage"
            @toggle-modal="togglePreviewModal"
          />
          <select
            :value="state.selectedFilter.value"
            @change="handleSelectFilter"
          >
            <option
              v-for="option in filters"
              :key="option.value"
              :value="option.value"
            >
              {{ option.name }}
            </option>
          </select>
          <div v-if="state.selectedFilter && state.selectedFilter.value === 'grayscale'">
            <select
              :value="state.grayscaleType"
              @change="handleGrayscaleSelection"
            >
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
            class="mt-half"
            type="button"
            @click="handleSubmit"
          >
            Apply filter
          </button>
          <button
            class="mt-half"
            type="button"
            @click="handleClear"
          >
            Clear
          </button>
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
.image {
  max-height: 50vh;
  max-width: 90vw;
}
.controls {
  max-width: calc(var(--spacer) * 25);
  min-width: calc(var(--spacer) * 15);
  width: 50%;
}
.image-preview, .image-preview-button {
  max-height: 4vh;
  max-width: 8vw;
}
.image-preview-button {
  background-color: transparent;
  padding: 0;
}
.previews {
  margin-top: var(--spacer-quarter);
}
.wrap {
  min-height: 100vh;
  width: 100%;
}
</style>
