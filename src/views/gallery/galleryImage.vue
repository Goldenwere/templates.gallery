<script setup lang='ts'>
import { computed, ref } from 'vue'

import { getContentType } from '@/src/utilities/fetch'

import type ArtWork from '@/src/types/views/shared/artWork'

import AppPlaceholder from '@/src/components/embeds/appPlaceholder.vue'

const props = defineProps<{
  piece: ArtWork,
}>()

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

const hasOnsiteImage = computed(() => {
  return !!props.piece.thumbnailUrl && thumbnailContentType.value.startsWith('image')
    || props.piece.url?.charAt(0) === '/' && urlContentType.value.startsWith('image')
})
</script>

<template lang='pug'>
.element(
  v-tippy='piece.title || "Untitled"'
  tabindex='0'
)
  span.indicator(
    v-if='piece.mature'
  ) Mature
  .thumbnail(
    v-if='hasOnsiteImage'
    :style='{ backgroundImage: `url(${piece.thumbnailUrl || piece.url})`, backgroundPosition: `${piece.thumbnailPosition || "center center"}` }'
  )
  AppPlaceholder(
    v-else
  )
  p {{ piece.title || 'Untitled' }}
</template>

<style scoped lang='sass'>
.element
  background: var(--theme-gallery-element-bg)
  color: var(--theme-gallery-element-fg)
  padding: 0.5em
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
  position: relative
  &:focus
    outline: 1px solid var(--theme-gallery-element-focus)
  .indicator
    opacity: 0.75
    display: block
    position: absolute
    top: 0.5em
    right: 0.5em
    font-style: italic
    font-size: 0.75em
    background: var(--theme-gallery-maturity-bg)
    color: var(--theme-gallery-maturity-fg)
    padding: 0.25em 0.5em
  .placeholder,
  .thumbnail
    height: 9em
    width: 9em
    background-size: cover
    margin: auto
  .thumbnail
    display: block
  p
    text-align: center
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
    font-size: 1.1em
    line-height: 1.1em
    margin: 0.5em 0 0
</style>
