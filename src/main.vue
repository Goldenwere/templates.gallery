<script setup lang='ts'>
import { computed, nextTick, ref } from 'vue'
import { type RouteLocationNormalized, useRoute, useRouter } from 'vue-router'
import { capitalizeFirstLetter } from '@/src/utilities/string'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'
import type site from '@/src/types/views/site'
import GalleryNavHeader from './components/navigation/GalleryNavHeader.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const ready = ref(false)
const showHeader = computed(() => {
  return ready && route.name !== 'home' && !store.hideHeader
})

fetchAndParseYaml('/content/site.yml')
  .then(async (content) => {
    store.$patch({ site: content as site })
    await router.isReady()
    ready.value = true
    setTitle(route)
    router.afterEach((to, from) => {
      nextTick(() => {
        setTitle(to)
      })
    })
  })

function setTitle(route: RouteLocationNormalized) {
  const name = (route.name === 'gallery' || route.name === 'subgallery')
    ? `${capitalizeFirstLetter(route.params.id as string)} - Gallery`
    : capitalizeFirstLetter(route.name as string)
  document.title = `${name} - ${store.site.title}`
}
</script>

<template lang='pug'>
#entry
  GalleryNavHeader(
    v-if='showHeader'
  )
  main
    router-view
</template>

<style lang='sass' scoped>
#entry
  width: 100vw
  height: 100vh
  overflow: auto
  position: relative
  z-index: 0
  header
    z-index: 1
  main
    z-index: 0
    position: relative
</style>
