<script setup lang='ts'>
import { computed, ref } from 'vue'
import type artWork from '@/src/types/views/shared/artWork'
import type homeData from '@/src/types/views/home'
import type siteData from '@/src/types/views/site'

const props = defineProps<{
  site: siteData,
  content: homeData,
}>()

const emit = defineEmits<{
  (e: 'selectedImage', image?: artWork): void
}>()

const selectedImage = ref({} as artWork | undefined)
const selectedImageIndex = ref(0)

selectedImage.value = props.content.featured?.[0]
emit('selectedImage', selectedImage.value)

/**
 * Handles selection of featured artwork
 * @param event the event that called this function
 * @param index the index of the featured artwork selected
 */
 function onFeatureClick(event: Event, index: number) {
  event.preventDefault()
  selectedImage.value = props.content.featured?.[index]
  selectedImageIndex.value = index
  emit('selectedImage', selectedImage.value)
}
</script>

<template lang='pug'>
#landing
  .body
    h1 {{ site.title }}
    h2(
      v-if='site.subtitle'
    ) {{ site.subtitle }}
    img.logo(
      :src='site.logo'
      v-if='site.logo'
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
    background-color: var(--theme-landing-body-bg)
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
</style>
