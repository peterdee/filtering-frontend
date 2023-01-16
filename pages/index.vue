<script setup lang="ts">
import axios from 'axios'
import 'common-styles/styles.css'

import filters, { type Filter } from '../utilities/filter-list'
import type { StoredImage } from '../types'

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

const revokeLinks = (): void => {
  URL.revokeObjectURL(state.selectedImageLink)
  state.storedImages.forEach((storedImage: StoredImage): void => {
    URL.revokeObjectURL(storedImage.fileLink)
  })
}

onBeforeUnmount((): void => revokeLinks())

const handleClear = (): void => {
  revokeLinks()

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

const handlePreviewClick = (id: number): null | void => {
  if (state.selectedImageId === id) {
    return null
  }
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

const handleThresholdInput = ({ value }: { value: string }): void => {
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
          accept="image/jpeg, image/png"
          type="file"
          @input="handleFileInput"
        >
      </div>
      <DisplayImageComponent
        v-if="state.selectedImage && !state.loading"
        :image-link="state.selectedImageLink"
        @toggle-modal="togglePreviewModal"
      />
      <div
        v-if="state.selectedImage && !state.loading"
        class="f d-col mh-auto controls"
      >
        <PreviewsComponent
          :images="state.storedImages"
          @handle-click="handlePreviewClick"
        />
        <ImageControlsComponent
          @handle-delete-image="handleDeleteImage"
          @handle-download-image="handleDownloadImage"
          @toggle-modal="togglePreviewModal"
        />
        <form
          class="f d-col form"
          @submit.prevent="handleSubmit"
        >
          <SelectionComponent
            :select-type="'filter'"
            :value="state.selectedFilter.value"
            @handle-select="handleSelectFilter"
          />
          <SelectionComponent
            v-if="state.selectedFilter && state.selectedFilter.value === 'grayscale'"
            :global-classes="'mt-half'"
            :select-type="'grayscale'"
            :value="state.grayscaleType"
            @handle-select="handleGrayscaleSelection"
          />
          <div v-if="state.selectedFilter && state.selectedFilter.withThreshold">
            <RangeComponent
              v-if="state.selectedFilter.controlType === 'range'"
              :handle-range-input="handleRangeInput"
              :selected-filter="state.selectedFilter"
              :threshold-value="state.thresholdValue"
            />
            <InputElement
              v-if="state.selectedFilter.controlType === 'input'"
              name="threshold"
              type="number"
              :global-classes="'mt-half'"
              :min="state.selectedFilter.thresholdMin"
              :placeholder="state.selectedFilter.inputPlaceholder"
              :value="state.thresholdValue"
              @handle-input="handleThresholdInput"
            />
          </div>
          <button
            class="mt-half control-button"
            type="submit"
          >
            Apply filter
          </button>
        </form>
        <button
          class="mt-half control-button"
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
.controls {
  max-width: calc(var(--spacer) * 25);
  min-width: calc(var(--spacer) * 15);
  width: 50%;
}
.control-button {
  height: calc(var(--spacer) * 2 - var(--spacer-quarter));
}
.form {
  width: 100%;
}
.wrap {
  min-height: 100vh;
  width: 100%;
}
</style>
