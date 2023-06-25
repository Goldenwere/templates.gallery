<script setup lang='ts'>
import { computed, reactive, ref } from 'vue'

import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import type ArtWork from '@/src/types/views/shared/artWork'
import type HomeViewModel from '@/src/types/views/home'

import HomeAbout from './homeAbout.vue'
import HomeLanding from './homeLanding.vue'
import HomeNavigation from './homeNavigation.vue'
import HomeSocial from './homeSocial.vue'

const store = useStore()

const content = reactive(store.home)
const app = reactive(store.app)

const selectedImage = ref({} as ArtWork | undefined)
const selectedImageUrl = computed(() => `url(${selectedImage.value?.thumbnailUrl})`)
const selectedImagePosition = computed(() => `${selectedImage.value?.thumbnailPosition}`)

const ready = ref(false)

if (store.home.copyrightNotice === undefined) {
  fetchAndParseYaml('/content/home.yml')
    .then((content) => {
      store.$patch({ home: content as HomeViewModel })
      ready.value = true
    })
} else {
  ready.value = true
}

/**
 * Handler for updating the selected image from the landing component
 * @param image the image that was selected
 */
function onSelectedImage(image: ArtWork) {
  selectedImage.value = image
}
</script>

<template lang='pug'>
#home(
  v-if='ready'
  :style='{ backgroundImage: selectedImageUrl, backgroundPosition: selectedImagePosition, }'
)
  HomeLanding(
    :app='app'
    :content='content'
    @selectedImage='onSelectedImage'
  )
  #info
    HomeNavigation(
      :directories='app.directories'
    )
    HomeAbout(
      v-if='content.about'
      :aboutContent='content.about'
    )
    HomeSocial(
      v-if='content.social'
      :socialContacts='content.social'
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
#places
  width: 40%

@media screen and (max-aspect-ratio: 1/1)
  #info
    flex-direction: column
    #places
      /* make space for theme picker */
      padding-bottom: 4em
  #navigation,
  #about,
  #places
    width: 100%
  #about
    article
      max-width: 24rem
      font-size: 1.2em
</style>
