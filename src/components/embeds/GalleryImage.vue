<script setup lang='ts'>
import type artWork from '@/src/types/artWork'

const props = defineProps<{
  piece: artWork,
}>()
</script>

<template lang='pug'>
.element
  span.indicator(
    v-if='piece.mature'
  ) Mature
  .thumbnail(
    v-if='piece.thumbnailUrl || piece.url'
    :style='{ backgroundImage: `url(${piece.thumbnailUrl || piece.url})`, backgroundPosition: `${piece.thumbnailPosition}` }'
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
  .thumbnail
    height: 9em
    width: 9em
    background-size: cover
    margin: auto
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
