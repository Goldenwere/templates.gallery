<script setup lang='ts'>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'
import type home from '@/src/types/views/home'
import type artWork from '@/src/types/artWork'
import type directoryRoute from '@/src/types/directoryRoute'
import type socialContact from '@/src/types/socialContact'
import GalleryArticle from '@/src/components/embeds/GalleryArticle.vue'
import GallerySocial from '@/src/components/embeds/GallerySocial.vue'

const store = useStore()
const route = useRoute()
const content = reactive(store.home)
const site = reactive(store.site)
const ready = ref(false)
const selectedImage = ref({} as artWork | undefined)
const selectedImageUrl = computed(() => `url(${selectedImage.value?.thumbnailUrl})`)
const selectedImagePosition = computed(() => `${selectedImage.value?.thumbnailPosition}`)
const selectedImageIndex = ref(0)
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
      const parsed = content as home
      store.$patch({ home: parsed })
      ready.value = true
      selectedImage.value = parsed.featured?.[0]
    })
} else {
  ready.value = true
  selectedImage.value = store.home.featured?.[0]
}

function onFeatureClick(event: Event, index: number) {
  event.preventDefault()
  selectedImage.value = store.home.featured?.[index]
  selectedImageIndex.value = index
}
</script>

<template lang='pug'>
#home(
  v-if='ready'
  :style='{ backgroundImage: selectedImageUrl, backgroundPosition: selectedImagePosition, }'
)
  #landing
    .body
      h1 {{ site.title }}
      h2(
        v-if='site.subtitle'
      ) {{ site.subtitle }}
      img.logo(
        :src='site.logo'
        alt='logo'
      )
      .featured-gallery
        .element(
          v-for='(feature, index) in content.featured'
          :class='{ "unselected": index !== selectedImageIndex }'
          @click='onFeatureClick($event, index)'
        )
          .img(
            :style='{ backgroundImage: `url(${feature.thumbnailUrl})`, backgroundPosition: `${feature.thumbnailPosition}`, }'
          )
  #info
    nav#navigation
      h2 Navigation
      .link(
        v-for='directory in directories'
      )
        img(
          :src='directory.directory.thumbnailUrl'
        )
        router-link(
          :to='directory.route'
        ) {{ directory.directory.title }}
    section#about(
      v-if='content.about'
    )
      h2 About
      GalleryArticle(
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
          GallerySocial(
            v-for='social in category'
            :social='social'
          )
</template>

<style scoped lang='sass'>
#home
  width: 100vw
  background-size: cover
  background-attachment: fixed
  #landing
    position: relative
    width: 100vw
    height: 100vh
    .body
      background-color: var(--theme-landing-body-bg)
      color: var(--theme-landing-body-fg)
      position: absolute
      display: flex
      flex-direction: column
      align-items: center
      top: 0
      bottom: 0
      left: 0
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
        grid-template-columns: 1fr 1fr 1fr 1fr
        .element
          aspect-ratio: 1
          cursor: pointer
          transition: opacity 0.5s var(--theme-transition-function)
          &.unselected
            opacity: 0.5
            &:hover
              opacity: 1.0
          .img
            background-size: cover
            background-position: center center
            width: 100%
            height: 100%
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
</style>
