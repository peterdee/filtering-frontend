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
    viewBox="0 0 189 189"
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
  >
    <path
      d="M3.51472 20.4853C-1.17157 15.799 -1.17157 8.20106 3.51472 3.51476C8.20101 -1.17153 15.799 -1.17153 20.4853 3.51476L184.534 167.564C189.22 172.25 189.22 179.848 184.534 184.534C179.848 189.22 172.25 189.22 167.563 184.534L3.51472 20.4853Z"
      :fill="props.color"
    />
    <path
      d="M20.4853 184.534C15.799 189.22 8.20103 189.22 3.51474 184.534C-1.17155 179.848 -1.17155 172.25 3.51474 167.563L167.564 3.51472C172.25 -1.17157 179.848 -1.17157 184.534 3.51472C189.22 8.20101 189.22 15.799 184.534 20.4853L20.4853 184.534Z"
      :fill="props.color"
    />
  </svg>
</template>
