<template>
  <div class="f d-col j-center ns modal-background">
    <div class="modal-tint" />
    <div class="spinner" />
  </div>
</template>

<style scoped>
.modal-background, .modal-tint {
  backdrop-filter: blur(var(--spacer-quarter));
  background-color: transparent;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
}
.modal-tint {
  background-color: var(--text);
  opacity: .5;
}
@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}
@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
.spinner {
  animation: sk-rotateplane 1.2s infinite ease-in-out;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  background-color: var(--background);
  height: calc(var(--spacer) * 4);
  margin: 100px auto;
  width: calc(var(--spacer) * 4);
}
</style>
