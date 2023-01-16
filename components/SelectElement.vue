<script setup lang="ts">
defineProps<{
  globalClasses: string;
  value: string;
}>()

const emit = defineEmits(['handle-change'])

const handler = (event: Event): void => emit('handle-change', event)
</script>

<template>
  <select
    :class="`select ${globalClasses}`"
    :value="value"
    @change="handler"
  >
    <slot />
  </select>
</template>

<style scoped>
.select {
  appearance: none;
  background-image: url('../assets/select-arrow.svg');
  background-position-x: calc(100% - var(--spacer) + var(--spacer-quarter));
  background-position-y: calc(var(--spacer-quarter) / 2);
  background-repeat: no-repeat;
  border: calc(var(--spacer-quarter) / 4) solid var(--accent);
  border-radius: var(--spacer-quarter);
  cursor: pointer;
  height: calc(var(--spacer) * 2 - var(--spacer-quarter));
  outline: none;
  padding: 0 var(--spacer);
  transition: border var(--transition) ease-out;
}
.select:focus {
  border: calc(var(--spacer-quarter) / 4) solid var(--accent-light);
  transition: border var(--transition) ease-in;
}
.select:hover {
  border: calc(var(--spacer-quarter) / 4) solid var(--accent-light);
  transition: border var(--transition) ease-in;
}
</style>
