<script setup lang='ts'>
import type artWork from '@/src/types/artWork'

const props = defineProps<{
  piece: artWork,
}>()
</script>

<template lang='pug'>
.element
  img(
    v-if='piece.thumbnailUrl'
    :alt='piece.alt || `thumbnail for ${piece.title}`'
    :src='piece.thumbnailUrl'
  )
  p {{ piece.title }}
</template>

<style scoped lang='sass'>
.element
  background-color: #000a
  padding: 0.5em
  height: 100%
  img
    max-height: 12em
    max-width: 9em
    width: auto
    height: auto
    margin: auto
    display: block
  p
    text-align: center
    margin: 0.5em 0 0
</style>
