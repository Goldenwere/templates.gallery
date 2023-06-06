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
import AppPlaceholder from '@/src/components/embeds/appPlaceholder.vue'
import HomeLanding from './homeLanding.vue'
import HomeSocial from './homeSocial.vue'

const store = useStore()
const route = useRoute()

const content = reactive(store.home)
const site = reactive(store.site)

const selectedImage = ref({} as artWork | undefined)
const selectedImageUrl = computed(() => `url(${selectedImage.value?.thumbnailUrl})`)
const selectedImagePosition = computed(() => `${selectedImage.value?.thumbnailPosition}`)

const ready = ref(false)

const directories = computed(() => {
  return site.directories?.map((directory): { route: RouteLocationRaw, directory: directoryRoute } => {
    if (directory.path === 'tos') {
      return {
        route: {
          name: 'tos',
        },
        directory,
      }
    } else if (directory.path === 'commission') {
      return {
        route: {
          name: 'commission',
        },
        directory,
      }
    } else {
      return {
        route: {
          name: 'gallery',
          params: {
            id: directory.path,
          }
        },
        directory,
      }
    }
  })
})

const socialMap = computed(() => {
  if (store.home?.social !== undefined) {
    let mapped: { [key: string]: socialContact[] } = { 'uncategorized': [] }
    store.home.social.forEach((value) => {
      if (value.category === undefined) {
        mapped['uncategorized'].push(value)
      } else if (mapped[value.category] === undefined) {
        mapped[value.category] = [ value ]
      } else {
        mapped[value.category].push(value)
      }
    })

    return mapped
  }
})

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
    nav#navigation
      h2 Navigation
      .link(
        v-for='directory in directories'
      )
        img(
          v-if='directory.directory.thumbnailUrl'
          :src='directory.directory.thumbnailUrl'
        )
        AppPlaceholder(
          v-else
        )
        router-link(
          :to='directory.route'
        ) {{ directory.directory.title }}
    section#about(
      v-if='content.about'
    )
      h2 About
      AppArticle(
        :content='content.about'
      )
    section#places(
      v-if='content.social'
    )
      h2 Places
      section(
        v-for='(category, index) in socialMap'
      )
        h3 {{ index }}
        .grid
          HomeSocial(
            v-for='social in category'
            :social='social'
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
      > h2
        margin: 0
    #navigation
      width: 30%
      background-color: var(--theme-home-nav-bg)
      color: var(--theme-home-nav-fg)
      display: flex
      flex-direction: column
      justify-content: flex-start
      gap: 0.5em
      .link
        display: flex
        gap: 1em
        align-items: center
        img
          max-width: 5em
          max-height: 5em
          width: auto
          height: auto
        .placeholder
          height: 5em
          width: 5em
    #about
      width: 30%
      background-color: var(--theme-home-about-bg)
      color: var(--theme-home-about-fg)
    #places
      width: 40%
      background-color: var(--theme-home-places-bg)
      color: var(--theme-home-places-fg)
      h3
        text-transform: capitalize
      .grid
        width: 100%
        display: flex
        flex-wrap: wrap
        gap: 1em
        justify-content: space-between
        .social
          height: 4em
          max-width: 48%

@media screen and (max-aspect-ratio: 1/1)
  #home
    #landing
      .body
        width: 100%
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
