<script setup lang='ts'>
import { scrollTo } from '@/src/utilities/dom'

import type GalleryArtWork from '@/src/types/internal/galleryArtWork'

import AppButton from '@/src/components/inputs/appButton.vue'

const props = defineProps<{
  piece: GalleryArtWork,
}>()
</script>

<template lang='pug'>
.body
  p {{ piece.date }}
  p {{ piece.description }}
  AppButton.to-top(
    @click='scrollTo($event, "header")'
  ) To Top
</template>

<style scoped lang='sass'>
.body
  margin: 0.5em auto 0
  width: calc(100vw - 1em)
  max-width: 30em
  .to-top
    display: block
    margin: auto
</style>
