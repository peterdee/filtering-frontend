<script setup lang="ts">
interface ComponentState {
  favicon: string;
  showModal: boolean;
}

const state = reactive<ComponentState>({
  favicon: 'favicon-dark.png',
  showModal: false
})

onBeforeMount((): void => {
  if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
    state.favicon = 'favicon-light.png'
  }
})

const handleLogoClick = (): void => {
  window.location.href = 'https://dyum.in'
}

const toggleModal = (): void => {
  state.showModal = !state.showModal
}
</script>

<template>
  <Head>
    <Link
      rel="icon"
      type="image/x-icon"
      :href="state.favicon"
    />
    <Title>
      Images | dyum.in
    </Title>
  </Head>
  <header class="f ai-center j-space-between ns">
    <AboutModal
      v-if="state.showModal"
      @toggle-modal="toggleModal"
    />
    <button
      class="logo-button"
      type="button"
      @click="handleLogoClick"
    >
      <img
        alt="dyum.in"
        class="logo"
        src="~/assets/logo.png"
      >
    </button>
    <button
      class="about"
      type="button"
      @click.stop="toggleModal"
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
  height: calc(var(--spacer) * 3);
  margin: 0 auto;
  max-width: 90vw;
  width: 100%;
}
.about {
  background-color: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  height: calc(var(--spacer) + var(--spacer-half) + var(--spacer-quarter));
  transition: background-color var(--transition) ease-out,
    border var(--transition) ease-out,
    box-shadow var(--transition) ease-out,
    color var(--transition) ease-out;
}
.about:hover {
  background-color: var(--accent-light);
  border: 1px solid var(--accent-light);
  box-shadow: 0 0 var(--spacer-half) var(--spacer-quarter) var(--accent-light);
  color: var(--text-inverted);
  transition: background-color var(--transition) ease-in,
    border var(--transition) ease-in,
    box-shadow var(--transition) ease-in,
    color var(--transition) ease-in;
}
.logo, .logo-button {
  height: calc(var(--spacer) * 2);
  width: calc(var(--spacer) * 2);
}
.logo-button {
  background-color: transparent;
  border-radius: 50%;
  padding: 0;
  transition: background-color var(--transition) ease-out,
    box-shadow var(--transition) ease-out;
}
.logo-button:hover {
  background-color: var(--accent-light);
  box-shadow: 0 0 var(--spacer-half) var(--spacer-quarter) var(--accent-light);
  transition: background-color var(--transition) ease-in,
    box-shadow var(--transition) ease-in;
}
</style>
