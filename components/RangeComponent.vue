<script setup lang="ts">
import type { Filter } from '../utilities/filter-list'

defineProps<{
  handleRangeInput:(event: Event) => void;
  selectedFilter: Filter;
  thresholdValue: number | string;
}>()
</script>

<template>
  <div class="f d-col">
    <div class="f j-center">
      <span class="mr-1">
        {{ selectedFilter.thresholdMin }}
      </span>
      <input
        type="range"
        :max="selectedFilter.thresholdMax"
        :min="selectedFilter.thresholdMin"
        :step="selectedFilter.step"
        :value="thresholdValue"
        @input="handleRangeInput"
      >
      <span class="ml-1">
        {{ selectedFilter.thresholdMax }}
      </span>
    </div>
    <div class="f j-center">
      {{ thresholdValue }}
    </div>
  </div>
</template>

<style scoped>

</style>
