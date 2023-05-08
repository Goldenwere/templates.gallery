<script setup lang='ts'>
import type artWork from '@/src/types/artWork'
import GalleryButton from '@/src/components/inputs/GalleryButton.vue'

const props = defineProps<{
  image: artWork,
}>()

const emits = defineEmits<{
  (e: 'close', event: Event): void
}>()

/**
 * Scrolls element into view
 * @param event the event that called this function
 * @param id the element's selector to scroll into view
 */
function scrollTo(event: Event, id: string) {
  event.preventDefault()
  document.querySelector(id)?.scrollIntoView()
}
</script>

<template lang='pug'>
.viewer
  .top
  .titlebar
    h2 {{ image.title || 'Untitled' }}
    GalleryButton(
      @click='scrollTo($event, ".viewer .body")'
    ) Description
    GalleryButton(
      @click='$emit("close", $event)'
    ) Close
  img(
    :src='image.url'
  )
  .body
    p {{ image.date }}
    p {{ image.description }}
    GalleryButton.to-top(
      @click='scrollTo($event, ".viewer .top")'
    ) To Top
</template>

<style scoped lang='sass'>
.viewer
  background-color: var(--theme-body-bg)
  position: absolute
  top: 4em
  bottom: 0
  left: 0
  right: 0
  overflow-y: auto
  .top
    position: absolute
    top: 0
    left: 0
    width: 0
    height: 0
  img
    max-height: calc(100% - 4em)
    max-width: 80%
    margin: auto
    width: auto
    height: auto
    display: block
  .titlebar
    display: flex
    align-items: center
    margin: 0.5em
    h2
      margin: 0
      margin-right: auto
  .body
    margin: 0.5em auto
    width: calc(100vw - 1em)
    max-width: 30em
    .to-top
      display: block
      margin: auto
</style>