<script setup lang="ts">
import { COLORS } from '../constants'

const props = defineProps({
  color: {
    default: COLORS.accent,
    required: false,
    type: String
  },
  size: {
    default: 24,
    required: false,
    type: Number
  }
})
</script>

<template>
  <svg
    viewBox="0 0 186 186"
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
  >
    <path
      d="M2.34315 183.362C-0.781049 180.238 -0.781049 175.173 2.34315 172.049L172.049 2.34315C175.173 -0.781049 180.238 -0.781049 183.362 2.34315C186.487 5.46734 186.487 10.5327 183.362 13.6569L13.6569 183.362C10.5327 186.487 5.46734 186.487 2.34315 183.362Z"
      :fill="props.color"
    />
    <path
      d="M2.50966 2.50963C5.63386 -0.61456 10.6992 -0.61456 13.8234 2.50963L183.529 172.215C186.653 175.339 186.653 180.405 183.529 183.529C180.405 186.653 175.339 186.653 172.215 183.529L2.50966 13.8233C-0.614532 10.6991 -0.614532 5.63383 2.50966 2.50963Z"
      :fill="props.color"
    />
  </svg>
</template>
