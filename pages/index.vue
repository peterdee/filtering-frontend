<script setup lang="ts">
import axios from 'axios'
import 'common-styles/styles.css'

import filters, { type Filter } from '../utilities/filter-list'
import formatSize from '../utilities/format-size'
import isMobile from '../utilities/is-mobile'
import type { StoredImage } from '../types'

interface ComponentState {
  errorMessage: string;
  flipDirection: string;
  grayscaleType: string;
  isMobile: boolean;
  loading: boolean;
  originalImageDimensions: {
    height: number;
    width: number;
  };
  rotationAngle: number;
  selectedFilter: Filter;
  selectedImage: File | null;
  selectedImageId: number | null;
  selectedImageLink: string;
  selectedImageName: string;
  showErrorModal: boolean;
  showPreviewModal: boolean;
  storedImages: StoredImage[];
  thresholdValue: number;
}

const state = reactive<ComponentState>({
  errorMessage: '',
  flipDirection: 'horizontal',
  grayscaleType: 'average',
  isMobile: false,
  loading: false,
  originalImageDimensions: {
    height: 0,
    width: 0
  },
  rotationAngle: 90,
  selectedFilter: filters[0],
  selectedImage: null,
  selectedImageId: null,
  selectedImageLink: '',
  selectedImageName: '',
  showErrorModal: false,
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

const handleFileInput = async (file: File): Promise<null | void> => {
  const maxFileSize = useRuntimeConfig().public.MAX_FILE_SIZE
  if (file.size > maxFileSize) {
    state.errorMessage = `Selected file size is too large! Maximum size is ${
      formatSize(maxFileSize)
    }!`
    return toggleErrorModal()
  }
  if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
    state.errorMessage = 'Invalid file format! Only JPEG an PNG files are allowed!'
    return toggleErrorModal()
  }

  const imageLink = URL.createObjectURL(file)
  const dimensions = await new Promise<{ height: number, width: number }>(
    (resolve): void => {
      const image = new Image()
      image.src = imageLink
      image.onload = (): void => {
        resolve({
          height: image.naturalHeight,
          width: image.naturalWidth
        })
      }
    }
  )
  if (dimensions.height > 4000 || dimensions.width > 4000) {
    URL.revokeObjectURL(imageLink)
    state.errorMessage = 'Image height and width should be less than 4000 px!'
    return toggleErrorModal()
  }

  state.originalImageDimensions = dimensions

  const id = Date.now()
  state.selectedImage = file
  state.selectedImageId = id
  state.selectedImageLink = imageLink
  state.selectedImageName = file.name

  if (!state.selectedFilter) {
    state.selectedFilter = filters[0]
    state.thresholdValue = filters[0].thresholdDefault
  }

  state.storedImages.push({
    appliedFilter: 'original',
    file,
    fileLink: state.selectedImageLink,
    id
  })
}

const handleFlipSelection = (event: Event): void => {
  const { value } = event.target as HTMLSelectElement
  state.flipDirection = value
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

const handleRotateSelection = (event: Event): void => {
  const { value } = event.target as HTMLSelectElement
  state.rotationAngle = Number(value)
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

const toggleErrorModal = (): void => {
  state.showErrorModal = !state.showErrorModal
}

const togglePreviewModal = (): void => {
  state.showPreviewModal = !state.showPreviewModal
}

const handleSubmit = async (): Promise<null | void> => {
  const {
    flipDirection,
    grayscaleType,
    selectedFilter,
    selectedImage,
    selectedImageName,
    rotationAngle,
    thresholdValue
  } = state
  if (!(selectedFilter && selectedImage)) {
    state.errorMessage = 'Please select image and filter!'
    return toggleErrorModal()
  }

  state.loading = true

  const formData = new FormData()
  formData.append('filter', selectedFilter.value)
  formData.append('image', selectedImage, selectedImageName)

  let appliedFilter = selectedFilter.name

  if (selectedFilter.value === 'flip') {
    appliedFilter += ` (${flipDirection})`
    formData.append('flipDirection', flipDirection)
  }
  if (selectedFilter.value === 'grayscale') {
    appliedFilter += ` (${grayscaleType})`
    formData.append('grayscaleType', grayscaleType)
  }
  if (selectedFilter.value === 'rotateFixed') {
    appliedFilter += ` (${rotationAngle} degrees)`
    formData.append('threshold', `${rotationAngle}`)
  }
  if (selectedFilter.withThreshold) {
    appliedFilter += ` (${thresholdValue})`
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
      appliedFilter,
      file: response.data,
      fileLink: processedImageLink,
      id
    })

    state.loading = false
  } catch (error) {
    state.loading = false
    state.errorMessage = 'Something went wrong...'
    return toggleErrorModal()
  }
}

onMounted((): void => {
  state.isMobile = isMobile()
})
</script>

<template>
  <div
    :class="`f d-col j-space-between wrap ${state.isMobile ? 'wrap-mobile' : ''}`"
  >
    <PreviewModal
      v-if="state.showPreviewModal"
      :applied-filter="state.storedImages.filter((
        image: StoredImage
      ): boolean => image.id === state.selectedImageId)[0].appliedFilter"
      :image-dimensions="state.originalImageDimensions"
      :image-link="state.selectedImageLink"
      :image-size="state.selectedImage?.size || 0"
      :is-mobile="state.isMobile"
      @handle-download="handleDownloadImage"
      @toggle-modal="togglePreviewModal"
    />
    <ErrorModal
      v-if="state.showErrorModal"
      :message="state.errorMessage"
      @toggle-modal="toggleErrorModal"
    />
    <HeaderComponent :is-mobile="state.isMobile" />
    <main class="f d-col ai-center j-center">
      <SpinnerComponent v-if="state.loading" />
      <DropZoneComponent
        v-if="!state.selectedImage"
        :is-mobile="state.isMobile"
        @handle-file="handleFileInput"
      />
      <DisplayImageComponent
        v-if="state.selectedImage"
        :image-link="state.selectedImageLink"
        @toggle-modal="togglePreviewModal"
      />
      <div
        v-if="state.selectedImage"
        class="f d-col mh-auto controls"
      >
        <PreviewsComponent
          :images="state.storedImages"
          :selected-image-id="Number(state.selectedImageId)"
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
            :global-classes="'ns'"
            :select-type="'filter'"
            :value="state.selectedFilter.value"
            @handle-select="handleSelectFilter"
          />
          <div class="f d-col additional-options">
            <SelectionComponent
              v-if="state.selectedFilter && state.selectedFilter.value === 'flip'"
              :global-classes="'mt-half ns'"
              :select-type="'flip'"
              :value="state.flipDirection"
              @handle-select="handleFlipSelection"
            />
            <SelectionComponent
              v-if="state.selectedFilter && state.selectedFilter.value === 'grayscale'"
              :global-classes="'mt-half ns'"
              :select-type="'grayscale'"
              :value="state.grayscaleType"
              @handle-select="handleGrayscaleSelection"
            />
            <SelectionComponent
              v-if="state.selectedFilter && state.selectedFilter.value === 'rotateFixed'"
              :global-classes="'mt-half ns'"
              :select-type="'rotate'"
              :value="`${state.rotationAngle}`"
              @handle-select="handleRotateSelection"
            />
            <div v-if="state.selectedFilter && state.selectedFilter.withThreshold">
              <RangeComponent
                v-if="state.selectedFilter.controlType === 'range'"
                :global-classes="'mt-half'"
                :selected-filter="state.selectedFilter"
                :threshold-value="state.thresholdValue"
                @handle-input="handleRangeInput"
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
    <FooterComponent :is-mobile="state.isMobile" />
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
  font-weight: 300;
}
.form {
  width: 100%;
}
.additional-options {
  height: calc(var(--spacer) * 4);
}
.wrap {
  min-height: 100vh;
  width: 100%;
}
.wrap-mobile {
  min-height: 80vh;
}
</style>
