<script setup lang='ts'>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import type artWork from '@/src/types/views/shared/artWork'
import type directoryRoute from '@/src/types/views/shared/directoryRoute'
import type homeData from '@/src/types/views/home'
import type socialContact from '@/src/types/views/shared/socialContact'

import AppArticle from '@/src/components/embeds/appArticle.vue'
import HomeLanding from './homeLanding.vue'
import HomeNavigation from './homeNavigation.vue'
import HomeSocial from './homeSocial.vue'

const store = useStore()
const route = useRoute()

const content = reactive(store.home)
const site = reactive(store.site)

const selectedImage = ref({} as artWork | undefined)
const selectedImageUrl = computed(() => `url(${selectedImage.value?.thumbnailUrl})`)
const selectedImagePosition = computed(() => `${selectedImage.value?.thumbnailPosition}`)

const ready = ref(false)

if (store.home.copyrightNotice === undefined) {
  fetchAndParseYaml('/content/home.yml')
    .then((content) => {
      store.$patch({ home: content as homeData })
      initializeView(content as homeData)
    })
} else {
  initializeView(store.home)
}

/**
 * Initializes the view data of the component
 */
function initializeView(content: homeData) {
  ready.value = true
}

/**
 * Handler for updating the selected image from the landing component
 * @param image the image that was selected
 */
function onSelectedImage(image: artWork) {
  selectedImage.value = image
}
</script>

<template lang='pug'>
#home(
  v-if='ready'
  :style='{ backgroundImage: selectedImageUrl, backgroundPosition: selectedImagePosition, }'
)
  HomeLanding(
    :site='site'
    :content='content'
    @selectedImage='onSelectedImage'
  )
  #info
    HomeNavigation(
      :site='site'
    )
    section#about(
      v-if='content.about'
    )
      h2 About
      AppArticle(
        :content='content.about'
      )
    HomeSocial(
      :content='content'
    )
</template>

<style scoped lang='sass'>
#home
  width: 100vw
  background-size: cover
  background-attachment: fixed
  #info
    position: relative
    display: flex
    min-height: 100vh
    width: 100vw
    > nav,
    > section
      padding: 1em
      > :deep(h2)
        margin: 0
    #navigation
      width: 30%
    #about
      width: 30%
      background-color: var(--theme-home-about-bg)
      color: var(--theme-home-about-fg)
    #places
      width: 40%

@media screen and (max-aspect-ratio: 1/1)
  #home
    #info
      flex-direction: column
      #navigation,
      #about,
      #places
        width: 100%
      #about
        article
          max-width: 24rem
          font-size: 1.2em
</style>
