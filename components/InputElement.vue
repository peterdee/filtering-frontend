<script setup lang="ts">
const emit = defineEmits(['handle-input'])

const props = defineProps({
  disabled: {
    default: false,
    required: false,
    type: Boolean
  },
  globalClasses: {
    default: '',
    required: false,
    type: String
  },
  maxValue: {
    default: Infinity,
    required: false,
    type: Number
  },
  minValue: {
    default: -Infinity,
    required: false,
    type: Number
  },
  name: {
    required: true,
    type: String
  },
  placeholder: {
    default: 'Amount',
    required: false,
    type: String
  },
  type: {
    default: 'number',
    required: false,
    type: String
  },
  value: {
    required: true,
    type: [Number, String]
  }
})

const handler = (event: Event): void => {
  const { name, value } = event.target as HTMLInputElement
  return emit('handle-input', { name, value })
}
</script>

<template>
  <input
    :class="`input ${props.globalClasses}`"
    :disabled="props.disabled"
    :max="props.maxValue"
    :min="props.minValue"
    :name="props.name"
    :placeholder="props.placeholder"
    :type="props.type"
    :value="props.value"
    @input="handler"
  >
</template>

<style scoped>
.input {
  height: calc(var(--spacer) * 2 - var(--spacer-quarter));
  width: 100%;
}
</style>
