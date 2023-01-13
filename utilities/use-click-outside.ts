import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export default function useOutsideClick<T extends EventTarget>(
  componentRef: Ref<T>,
  callback: () => void
): null | ((event: MouseEvent) => null | void) {
  if (!componentRef) {
    return null
  }

  const listener = (event: MouseEvent) => {
    if (event.target !== componentRef.value &&
      event.composedPath().includes(componentRef.value)) {
      return null
    }
    if (typeof callback === 'function') {
      return callback()
    }
  }

  onMounted((): void => {
    window.addEventListener('click', listener)
  })

  onBeforeUnmount((): void => {
    window.removeEventListener('click', listener)
  })

  return listener
}
