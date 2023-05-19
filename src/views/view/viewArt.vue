<script setup lang='ts'>
import { ref } from 'vue'
import { useStore } from '@/src/store'
import type galleryArtWork from '@/src/types/galleryArtWork'
import GalleryButton from '@/src/components/inputs/GalleryButton.vue'

const store = useStore()

const props = defineProps<{
  image: galleryArtWork,
}>()

const emits = defineEmits<{
  (e: 'back', event: Event): void
}>()

const maximized = ref(false)

/**
 * Scrolls element into view
 * @param event the event that called this function
 * @param id the element's selector to scroll into view
 */
function scrollTo(event: Event, id: string) {
  event.preventDefault()
  document.querySelector(id)?.scrollIntoView()
}

function toggleMaximized(event: Event, value: boolean) {
  event.preventDefault()
  maximized.value = value
  store.hideHeader = value
}
</script>

<template lang='pug'>
.viewer
  .titlebar
    h2 {{ image.title || 'Untitled' }}
    GalleryButton(
      @click='scrollTo($event, ".viewer .body")'
    ) Description
    GalleryButton(
      @click='toggleMaximized($event, true)'
    ) Full Size
    GalleryButton(
      @click='$emit("back", $event)'
    ) Close
  img(
    :src='image.url'
    @click='toggleMaximized($event, true)'
  )
  .body
    p {{ image.date }}
    p {{ image.description }}
    GalleryButton.to-top(
      @click='scrollTo($event, "header")'
    ) To Top
  .maximized(
    @click='toggleMaximized($event, false)'
    v-if='maximized'
  )
    img(
      :src='image.url'
    )
</template>

<style scoped lang='sass'>
.viewer
  background-color: var(--theme-body-bg)
  position: relative
  img
    max-height: calc(100vh - 8em)
    max-width: 80%
    margin: auto
    width: auto
    height: auto
    display: block
    cursor: pointer
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
  .maximized
    position: fixed
    top: 0em
    left: 0em
    right: 0em
    bottom: 0em
    z-index: 99
    background-color: var(--theme-modal-overlay-bg)
    img
      position: relative
      max-width: calc(100% - 1em)
      max-height: calc(100% - 1em)
      width: auto
      height: auto
      cursor: pointer
      margin: 0.5em auto
</style>
