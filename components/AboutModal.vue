<script setup lang="ts">
const emit = defineEmits(['toggle-modal'])
</script>

<template>
  <div class="f d-col ns wrap">
    <div class="f j-end">
      <button
        class="close"
        type="button"
        @click="emit('toggle-modal')"
      >
        <CloseIcon
          :color="'black'"
          :size="32"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.close {
  background-color: transparent;
  border-radius: 50%;
  height: calc(var(--spacer) * 3 + var(--spacer-half));
  padding: 0;
  width: calc(var(--spacer) * 3 + var(--spacer-half));
}
.close:hover {
  background-color: var(--accent-light);
}
.wrap {
  background-color: var(--background);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
}
</style>
