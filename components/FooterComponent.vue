<script setup lang="ts">
import axios from 'axios'

interface ComponentState {
  statusClassName: string;
  title: string;
}

const state = reactive<ComponentState>({
  statusClassName: 'loading',
  title: 'Loading...'
})

const year = new Date().getFullYear()

onMounted((): void => {
  axios({
    method: 'GET',
    url: useRuntimeConfig().public.BACKEND_URL
  }).then((): void => {
    state.statusClassName = 'ok'
    state.title = 'Backend is accessible'
  }).catch((): void => {
    state.statusClassName = 'error'
    state.title = 'Backend is not accessible'
  })
})
</script>

<template>
  <footer class="f ai-center j-center ns">
    <span class="ml-half mr-1">
      {{ `© ${year}` }}
    </span>
    <span class="mr-1">
      <a
        href="https://github.com/julyskies/brille"
        target="_blank"
      >
        Brille image processing
      </a>
    </span>
    <span class="mr-1">
      <a
        href="https://github.com/peterdee"
        target="_blank"
      >
        Peter Dyumin
      </a>
    </span>
    <span>
      Backend status:
    </span>
    <span class="mh-half">
      <div
        :class="`status ${state.statusClassName}`"
        :title="state.title"
      />
    </span>
  </footer>
</template>

<style scoped>
footer {
  flex-wrap: wrap;
  font-size: calc(var(--spacer) - var(--spacer-quarter));
  height: calc(var(--spacer) * 3);
  width: 100%;
}
.error {
  background-color: var(--error);
}
.error:hover {
  background-color: var(--error-light);
}
.loading {
  background-color: var(--muted);
}
.loading:hover {
  background-color: var(--muted-light);
}
.ok {
  background-color: var(--success);
}
.ok:hover {
  background-color: var(--success-light);
}
.status {
  border-radius: 50%;
  height: calc(var(--spacer) - var(--spacer-quarter));
  transition: background-color var(--transition) ease-out;
  width: calc(var(--spacer) - var(--spacer-quarter));
}
.status:hover {
  transition: background-color var(--transition) ease-in;
}
</style>
