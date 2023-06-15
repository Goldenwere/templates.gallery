<script setup lang='ts'>
import { computed, ref } from 'vue'

import { getContentType } from '@/src/utilities/fetch'
import { scrollTo } from '@/src/utilities/dom'
import { useStore } from '@/src/store'

import type galleryArtWork from '@/src/types/internal/galleryArtWork'

import AppButton from '@/src/components/inputs/appButton.vue'
import AppPlaceholder from '@/src/components/embeds/appPlaceholder.vue'
import ViewBody from './viewBody.vue'
import ViewTitlebar from './viewTitlebar.vue'

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
  ViewTitlebar(
    :title='piece.title || "Untitled"'
  )
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
  ViewBody(
    :piece='piece'
  )
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
</style>
