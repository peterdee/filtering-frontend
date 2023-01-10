<script setup lang="ts">
import type { Filter } from '../utilities/filter-list'

defineProps<{
  handleRangeInput: (event: Event) => void;
  selectedFilter: Filter;
  thresholdValue: number | string;
}>()
</script>

<template>
  <div class="f d-col">
    <div class="f j-center ai-center">
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
input[type=range] {
  height: 10px;
  margin: 10px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  background: var(--accent);
  border-radius: var(--spacer-half);
  cursor: pointer;
  height: 10px;
  width: 100%;
}
input[type=range]::-webkit-slider-thumb {
  border: 2px solid #3478ab;
  height: var(--spacer);
  width: calc(var(--spacer) - var(--spacer-quarter));
  border-radius: var(--spacer-half);
  background-color: var(--background);
  cursor: pointer;
  margin-top: -3px;
}
input[type=range]::slider-thumb {
  border: 2px solid #3478ab;
  height: var(--spacer);
  width: calc(var(--spacer) - var(--spacer-quarter));
  border-radius: var(--spacer-half);
  background: var(--background);
  cursor: pointer;
  margin-top: -3px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--accent);
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #ffffff;
  background: #367aad;
  border-radius: 8px;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #ffffff;
  border: 2px solid #3478ab;
  height: 16px;
  width: 12px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #367aad;
  border-radius: 8px;
  box-shadow: 0px 0px 0px #ffffff;
}
input[type=range]::-ms-fill-upper {
  background: #367aad;
  border-radius: 8px;
  box-shadow: 0px 0px 0px #ffffff;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #ffffff;
  border: 2px solid #3478ab;
  height: 16px;
  width: 12px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #367aad;
}
input[type=range]:focus::-ms-fill-upper {
  background: #367aad;
}
</style>
