<script setup lang='ts'>
import { computed } from 'vue'
import type artWork from '@/src/types/views/shared/artWork'
import GalleryPlaceholder from './galleryPlaceholder.vue'

const props = defineProps<{
  piece: artWork,
}>()

const hasOnsiteImage = computed(() => {
  return !!props.piece.thumbnailUrl || props.piece.url?.charAt(0) === '/'
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
  GalleryPlaceholder(
    v-else
  )
  p {{ piece.title || 'Untitled' }}
</template>

<style scoped lang='sass'>
.element
  background-color: #000a
  padding: 0.5em
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
  position: relative
  &:focus
    outline: 1px solid var(--theme-nav-fg)
  .indicator
    opacity: 0.75
    display: block
    position: absolute
    top: 0.5em
    right: 0.5em
    font-style: italic
    font-size: 0.75em
    background-color: #000a
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
