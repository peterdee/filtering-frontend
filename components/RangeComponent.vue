<script setup lang="ts">
import type { Filter } from '../utilities/filter-list'

const emit = defineEmits(['handle-input'])

defineProps<{
  globalClasses?: string;
  selectedFilter: Filter;
  thresholdValue: number | string;
}>()

const handle = (event: Event): void => emit('handle-input', event)
</script>

<template>
  <div :class="`f d-col ${globalClasses || ''}`">
    <div class="t-center ns text">
      {{ selectedFilter.thresholdDescription || '' }}
    </div>
    <div class="f j-space-between mt-quarter ai-center">
      <span class="f j-start mr-half ns text values">
        {{ selectedFilter.thresholdMin }}
      </span>
      <input
        type="range"
        :max="selectedFilter.thresholdMax"
        :min="selectedFilter.thresholdMin"
        :step="selectedFilter.step"
        :value="thresholdValue"
        @input="handle"
      >
      <span class="f j-end ml-half ns text values">
        {{ selectedFilter.thresholdMax }}
      </span>
    </div>
    <div class="f j-center mt-quarter ns text">
      {{ thresholdValue }}
    </div>
  </div>
</template>

<style scoped>
.text {
  font-size: calc(var(--spacer) - var(--spacer-quarter));
}
.values {
  width: calc(var(--spacer) * 2 + var(--spacer-half));
}
input[type=range] {
  appearance: none;
  width: calc(100% - var(--spacer) * 5);
  -webkit-appearance: none;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  background: var(--muted-light);
  border-radius: var(--spacer-half);
  cursor: pointer;
  height: calc(var(--spacer) - var(--spacer-quarter));
  width: 100%;
}
input[type=range]::-webkit-slider-thumb {
  background: var(--accent);
  border-radius: var(--spacer-quarter);
  cursor: pointer;
  height: var(--spacer);
  margin-top: calc(var(--spacer-quarter) / 2 * -1);
  width: calc(var(--spacer) - var(--spacer-quarter));
  -webkit-appearance: none;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--muted-light);
}
input[type=range]::-moz-range-track {
  background: var(--muted-light);
  border-radius: var(--spacer-half);
  cursor: pointer;
  height: calc(var(--spacer) - var(--spacer-quarter));
  width: 100%;
}
input[type=range]::-moz-range-thumb {
  background: var(--accent);
  border-radius: var(--spacer-quarter);
  cursor: pointer;
  height: var(--spacer);
  width: calc(var(--spacer) - var(--spacer-quarter));
}
input[type=range]::-ms-track {
  background: transparent;
  border-color: transparent;
  color: transparent;
  cursor: pointer;
  height: calc(var(--spacer) - var(--spacer-quarter));
  width: 100%;
}
input[type=range]::-ms-fill-lower,
input[type=range]::-ms-fill-upper {
  background: var(--muted-light);
  border-radius: var(--spacer);
}
input[type=range]::-ms-thumb {
  background: var(--accent);
  border-radius: var(--spacer-quarter);
  cursor: pointer;
  height: var(--spacer);
  width: calc(var(--spacer) - var(--spacer-quarter));
}
input[type=range]:focus::-ms-fill-lower,
input[type=range]:focus::-ms-fill-upper {
  background: var(--muted-light);
}
</style>
