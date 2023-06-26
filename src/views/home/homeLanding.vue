<script setup lang='ts'>
import type ArtWork from '@/src/types/views/shared/artWork'
import type HomeViewModel from '@/src/types/views/home'
import type AppViewModel from '@/src/types/views/app'

import HomeFeaturedCarousel from './homeFeaturedCarousel.vue'

const props = defineProps<{
  app: AppViewModel,
  content: HomeViewModel,
}>()

const emit = defineEmits<{
  (e: 'selectedImage', image?: ArtWork): void
}>()
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
    HomeFeaturedCarousel(
      :featured='content.featured'
      :featuredFirstImage='content.featuredFirstImage'
      @selectedImage='$emit("selectedImage", $event)'
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
    @include themeColors(var(--theme-home-landing-bg), var(--theme-home-landing-fg), var(--theme-home-landing-link))
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

@media screen and (max-aspect-ratio: 1/1)
  #landing
    .body
      width: 100%
</style>
