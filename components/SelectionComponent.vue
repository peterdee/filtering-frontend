<script setup lang="ts">
import filters from '../utilities/filter-list'

const props = defineProps({
  globalClasses: {
    default: '',
    required: false,
    type: String
  },
  selectType: {
    required: true,
    type: String
  },
  value: {
    required: true,
    type: String
  }
})

const emit = defineEmits(['handle-select'])

const handler = (event: Event): void => emit('handle-select', event)
</script>

<template>
  <SelectElement
    :global-classes="props.globalClasses"
    :value="props.value"
    @handle-change="handler"
  >
    <template v-if="props.selectType === 'filter'">
      <option
        v-for="option in filters"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </template>
    <template v-if="props.selectType === 'flip'">
      <option value="horizontal">
        Horizontal
      </option>
      <option value="vertical">
        Vertical
      </option>
    </template>
    <template v-if="props.selectType === 'grayscale'">
      <option value="average">
        Average
      </option>
      <option value="luminocity">
        Luminocity
      </option>
    </template>
    <template v-if="props.selectType === 'rotate'">
      <option value="90">
        90 degrees
      </option>
      <option value="180">
        180 degrees
      </option>
      <option value="270">
        270 degrees
      </option>
    </template>
  </SelectElement>
</template>
