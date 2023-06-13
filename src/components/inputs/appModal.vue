<script setup lang='ts'>
import AppButton from '@/src/components/inputs/appButton.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template lang='pug'>
.modal
  .modal-overlay
  .modal-content
    .toolbar
      AppButton.close(
        @click='emit("close")'
      )
        span Close
    slot
</template>

<style scoped lang='sass'>
.modal
  z-index: 99
  position: fixed
  width: 90vw
  max-width: 48em
  height: fit-content
  max-height: 98vh
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  color: var(--theme-modal-fg)
  background: var(--theme-modal-bg)
  .modal-overlay
    z-index: -1
    position: fixed
    top: -100vh
    left: -100vw
    bottom: -100vh
    right: -100vw
    background: var(--theme-modal-overlay-bg)
  .modal-content
    z-index: 0
    position: relative
    padding: 1em
    background: var(--theme-modal-bg)
  .toolbar
    width: 100%
    display: flex
    gap: 0.5em
    .close
      margin-left: auto
</style>
