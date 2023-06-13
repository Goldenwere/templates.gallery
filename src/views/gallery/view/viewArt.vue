<script setup lang='ts'>
import { computed, ref } from 'vue'

import { getContentType } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import type galleryArtWork from '@/src/types/internal/galleryArtWork'

import AppButton from '@/src/components/inputs/appButton.vue'
import AppPlaceholder from '@/src/components/embeds/appPlaceholder.vue'

const store = useStore()

const props = defineProps<{
  piece: galleryArtWork,
}>()

const emits = defineEmits<{
  (e: 'back', event: Event): void
}>()

const maximized = ref(false)
const urlContentType = ref('')
const thumbnailContentType = ref('')
if (!!props.piece.url) {
  getContentType(props.piece.url)
  .then((value) => {
    urlContentType.value = value || ''
  })
}
if (!!props.piece.thumbnailUrl) {
  getContentType(props.piece.thumbnailUrl)
  .then((value) => {
    thumbnailContentType.value = value || ''
  })
}

const isValidImage = computed(() => {
  return !!props.piece.thumbnailUrl && thumbnailContentType.value.startsWith('image')
    || props.piece.url?.charAt(0) === '/' && urlContentType.value.startsWith('image')
})

/**
 * Scrolls element into view
 * @param event the event that called this function
 * @param id the element's selector to scroll into view
 */
function scrollTo(event: Event, id: string) {
  event.preventDefault()
  document.querySelector(id)?.scrollIntoView()
}

/**
 * Handler for toggling maximization of the piece
 * @param event the event that called this function
 * @param value whether to enable or disable maximization
 */
function toggleMaximized(event: Event, value: boolean) {
  event.preventDefault()
  maximized.value = value
  store.hideHeader = value
}
</script>

<template lang='pug'>
.viewer
  .titlebar
    h2 {{ piece.title || 'Untitled' }}
    AppButton(
      @click='scrollTo($event, ".viewer .body")'
    ) Description
    AppButton(
      v-if='isValidImage'
      @click='toggleMaximized($event, true)'
    ) Full Size
    AppButton(
      @click='$emit("back", $event)'
    ) Close
  img(
    v-if='isValidImage'
    :src='piece.url'
    @click='toggleMaximized($event, true)'
  )
  AppPlaceholder(
    v-else
  )
  .body
    p {{ piece.date }}
    p {{ piece.description }}
    AppButton.to-top(
      @click='scrollTo($event, "header")'
    ) To Top
  .maximized(
    @click='toggleMaximized($event, false)'
    v-if='maximized'
  )
    img(
      :src='piece.url'
    )
</template>

<style scoped lang='sass'>
@import '@/src/styles/mixins.scss'

.viewer
  position: relative
  img,
  .placeholder
    margin: auto
    width: auto
    height: auto
  img
    max-height: calc(100vh - 8em)
    max-width: 80%
    cursor: pointer
    display: block
  .placeholder
    height: 5em
    width: 5em
  .titlebar
    display: flex
    align-items: center
    margin-bottom: 1em
    gap: 0.5em
    h2
      margin: 0
      margin-right: auto
    .button
      white-space: nowrap
  .body
    margin: 0.5em auto 0
    width: calc(100vw - 1em)
    max-width: 30em
    .to-top
      display: block
      margin: auto
  .maximized
    position: fixed
    @include positioning(0, 0, 0, 0)
    z-index: 99
    background: var(--theme-modal-overlay-bg)
    img
      position: relative
      max-width: calc(100% - 1em)
      max-height: calc(100% - 1em)
      width: auto
      height: auto
      cursor: pointer
      margin: 0.5em auto

@piece screen and (max-aspect-ratio: 5/6)
  .viewer
    .titlebar
      flex-wrap: wrap
      justify-content: center
      h2
        width: 100%
        flex: 0 0 100%
</style>
