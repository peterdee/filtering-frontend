<script setup lang="ts">
interface ComponentState {
  showModal: boolean;
}

const state = reactive<ComponentState>({
  showModal: false
})

const handleLogoClick = (): void => {
  window.location.href = 'https://dyum.in'
}

const toggleModal = (): void => {
  state.showModal = !state.showModal
}
</script>

<template>
  <header class="f ai-center j-space-between ns">
    <AboutModal
      v-if="state.showModal"
      @toggle-modal="toggleModal"
    />
    <button
      class="logo"
      type="button"
      @click="handleLogoClick"
    >
      <img
        alt="dyum.in"
        src=""
      >
    </button>
    <button
      class="about"
      type="button"
      @click="toggleModal"
    >
      About
    </button>
  </header>
</template>

<style scoped>
header {
  background-color: transparent;
  flex-wrap: wrap;
  font-size: calc(var(--spacer) - var(--spacer-quarter));
  height: calc(var(--spacer) * 2);
  margin: 0 auto;
  max-width: 90vw;
  padding: var(--spacer);
  width: 100%;
}
.about {
  height: calc(var(--spacer) + var(--spacer-half));
}
.logo, .logo-button {
  height: calc(var(--spacer) + var(--spacer-half));
  width: calc(var(--spacer) + var(--spacer-half));
}
.logo-button {
  background-color: transparent;
  padding: 0;
}
.modal-wrap {
  background-color: var(--background);
  display: flex;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
}
</style>
