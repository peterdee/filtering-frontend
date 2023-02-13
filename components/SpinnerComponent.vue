<template>
  <div class="f d-col j-center ns modal-background">
    <div class="modal-tint" />
    <div class="mh-auto spinner" />
  </div>
</template>

<style scoped>
.modal-background, .modal-tint {
  backdrop-filter: blur(var(--spacer-quarter));
  background-color: transparent;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}
.modal-tint {
  background-color: var(--text);
  opacity: .5;
}
@keyframes ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spinner {
  display: inline-block;
  height: calc(var(--spacer) * 5);
  width: calc(var(--spacer) * 5);
}
.spinner:after {
  animation: ring 1.2s linear infinite;
  border: 6px solid var(--background);
  border-color: var(--background) transparent var(--background) transparent;
  border-radius: 50%;
  content: " ";
  display: block;
  height: calc(var(--spacer) * 4);
  margin: var(--spacer-half);
  width: calc(var(--spacer) * 4);
}
</style>
