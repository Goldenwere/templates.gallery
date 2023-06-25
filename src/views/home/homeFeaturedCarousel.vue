<script setup lang='ts'>
import { ref } from 'vue'

import { randomRangeInt } from '@/src/utilities/number'

import type ArtWork from '@/src/types/views/shared/artWork'

const props = defineProps<{
  featured: ArtWork[],
  featuredFirstImage: number | 'random'
}>()

const emit = defineEmits<{
  (e: 'selectedImage', image?: ArtWork): void
}>()

// Determine what the first image should be based on settings
let selectedImageInitialIndex = 0
if (props.featuredFirstImage === 'random') {
  selectedImageInitialIndex = randomRangeInt(0, (props.featured.length || 1) - 1)
} else if (typeof(props.featuredFirstImage) === typeof(0)) {
  selectedImageInitialIndex = props.featuredFirstImage as number
}

const selectedImageIndex = ref(selectedImageInitialIndex)

emit('selectedImage', props.featured[selectedImageIndex.value])

/**
 * Handles selection of featured artwork
 * @param event the event that called this function
 * @param index the index of the featured artwork selected
 */
 function onFeatureClick(event: Event, index: number) {
  event.preventDefault()
  selectedImageIndex.value = index
  emit('selectedImage', props.featured[selectedImageIndex.value])
}
</script>

<template lang='pug'>
.featured-gallery
  .element(
    v-for='(feature, index) in featured'
    tabindex='0'
    :class='{ "selected": index === selectedImageIndex }'
    @click='onFeatureClick($event, index)'
    @keydown.enter='onFeatureClick($event, index)'
  )
    .img(
      :style='{ backgroundImage: `url(${feature.thumbnailUrl})`, backgroundPosition: `${feature.thumbnailPosition}`, }'
    )
</template>

<style scoped lang='sass'>
.featured-gallery
  margin-top: 1em
  padding: 0 1em
  width: 100%
  display: grid
  gap: 0.25em
  grid-template-columns: repeat(auto-fit, minmax(3rem,1fr))
  .element
    aspect-ratio: 1
    cursor: pointer
    transition: opacity 0.5s var(--theme-transition-function)
    opacity: 0.5
    &:focus
      outline: 1px solid var(--theme-nav-fg)
    &.selected,
    &:hover
      opacity: 1.0
    .img
      background-size: cover
      background-position: center center
      width: 100%
      height: 100%
</style>