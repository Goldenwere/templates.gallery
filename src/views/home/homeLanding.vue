<script setup lang='ts'>
import { ref } from 'vue'

import { randomRangeInt } from '@/src/utilities/number'

import type ArtWork from '@/src/types/views/shared/artWork'
import type HomeViewModel from '@/src/types/views/home'
import type AppViewModel from '@/src/types/views/app'

const props = defineProps<{
  app: AppViewModel,
  content: HomeViewModel,
}>()

const emit = defineEmits<{
  (e: 'selectedImage', image?: ArtWork): void
}>()

// Determine what the first image should be based on settings
let selectedImageInitialIndex = 0
if (props.content.featuredFirstImage === 'random') {
  selectedImageInitialIndex = randomRangeInt(0, (props.content.featured?.length || 1) - 1)
} else if (typeof(props.content.featuredFirstImage) === typeof(0)) {
  selectedImageInitialIndex = props.content.featuredFirstImage as number
}

const selectedImageIndex = ref(selectedImageInitialIndex)

emit('selectedImage', props.content.featured?.[selectedImageIndex.value])

/**
 * Handles selection of featured artwork
 * @param event the event that called this function
 * @param index the index of the featured artwork selected
 */
function onFeatureClick(event: Event, index: number) {
  event.preventDefault()
  selectedImageIndex.value = index
  emit('selectedImage', props.content.featured?.[selectedImageIndex.value])
}
</script>

<template lang='pug'>
#landing
  .body
    h1 {{ app.title }}
    h2(
      v-if='app.subtitle'
    ) {{ app.subtitle }}
    img.logo(
      :src='app.logo'
      v-if='app.logo'
      alt='logo'
    )
    .featured-gallery
      .element(
        v-for='(feature, index) in content.featured'
        tabindex='0'
        :class='{ "unselected": index !== selectedImageIndex }'
        @click='onFeatureClick($event, index)'
        @keydown.enter='onFeatureClick($event, index)'
      )
        .img(
          :style='{ backgroundImage: `url(${feature.thumbnailUrl})`, backgroundPosition: `${feature.thumbnailPosition}`, }'
        )
</template>

<style scoped lang='sass'>
@import '@/src/styles/mixins.scss'

#landing
  position: relative
  width: 100vw
  height: 100vh
  text-align: center
  .body
    background: var(--theme-landing-body-bg)
    color: var(--theme-landing-body-fg)
    position: absolute
    display: flex
    flex-direction: column
    align-items: center
    @include positioning(0, 0, 0, unset)
    width: 30%
    .logo
      max-height: 12em
      max-width: 95%
      height: auto
      width: auto
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
        &:focus
          outline: 1px solid var(--theme-nav-fg)
        &.unselected
          opacity: 0.5
          &:hover
            opacity: 1.0
        .img
          background-size: cover
          background-position: center center
          width: 100%
          height: 100%

@media screen and (max-aspect-ratio: 1/1)
  #landing
    .body
      width: 100%
</style>
