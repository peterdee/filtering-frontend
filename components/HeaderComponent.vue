<script setup lang="ts">
interface ComponentState {
  favicon: string;
  showModal: boolean;
}

defineProps<{
  isMobile: boolean;
}>()

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
    <Meta charset="UTF-8" />
    <Meta
      content="width=device-width, initial-scale=1.0"
      name="viewport"
    />
    <Meta
      content="https://images.dyum.in"
      property="og:url"
    />
    <Meta
      content="Images: a demo for Brille module | dyum.in"
      property="og:title"
    />
    <Meta
      content="This application demonstrates capabilities of Brille image processing module"
      property="og:description"
    />
    <Meta
      content="/favicon-dark.png"
      property="og:image"
    />
    <Meta
      content="/favicon-dark.png"
      property="twitter:image"
    />
    <Title>
      Images: a demo for Brille module | dyum.in
    </Title>
  </Head>
  <AboutModal
    v-if="state.showModal"
    @toggle-modal="toggleModal"
  />
  <header
    :class="`f ai-center j-space-between mh-auto ns ${isMobile ? 'mobile' : ''}`"
  >
    <button
      class="f j-center logo-button"
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
  height: calc(var(--spacer) * 3);
  min-width: calc(var(--spacer) * 15);
  width: 60vw;
}
.mobile {
  width: 90%;
}
.about {
  background-color: transparent;
  border: calc(var(--spacer-quarter) / 2) solid var(--accent);
  color: var(--accent);
  height: calc(var(--spacer) * 2 - var(--spacer-quarter));
  padding: 0 var(--spacer-half);
  transition: background-color var(--transition) ease-out,
    border var(--transition) ease-out,
    color var(--transition) ease-out;
}
.about:hover {
  background-color: var(--accent-light);
  border: calc(var(--spacer-quarter) / 2) solid var(--accent-light);
  color: var(--text-inverted);
  transition: background-color var(--transition) ease-in,
    border var(--transition) ease-in,
    color var(--transition) ease-in;
}
.logo, .logo-button {
  height: calc(var(--spacer) * 2 + var(--spacer-quarter));
  width: calc(var(--spacer) * 2 + var(--spacer-quarter));
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
  box-shadow: 0 0 var(--spacer) calc(var(--spacer-quarter) / 2) var(--accent-light);
  transition: background-color var(--transition) ease-in,
    box-shadow var(--transition) ease-in;
}
</style>
