<script setup lang='ts'>
import { computed, nextTick, ref } from 'vue'
import { type RouteLocationNormalized, useRoute, useRouter } from 'vue-router'

import { capitalizeFirstLetter } from '@/src/utilities/string'
import { envProd } from '@/src/env.prod'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import type env from '@/src/types/internal/env'
import type site from '@/src/types/views/site'

import AppHeader from './components/navigation/appHeader.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const showHeader = computed(() => {
  return ready && route.name !== 'home' && !store.hideHeader
})
const ready = ref(false)

fetchAndParseYaml('/content/site.yml')
  .then(async (content) => {
    const environment: env = envProd
    store.$patch({ environment: environment as env })

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

/**
 * Sets the title of the document based on current route
 * @param route the current route
 */
function setTitle(route: RouteLocationNormalized) {
  const name = (route.name === 'gallery' || route.name === 'subgallery')
    ? `${capitalizeFirstLetter(route.params.id as string)} - Gallery`
    : capitalizeFirstLetter(route.name as string)
  document.title = `${name} - ${store.site.title}`
}
</script>

<template lang='pug'>
#entry
  AppHeader(
    v-if='showHeader'
  )
  main
    router-view
</template>

<style lang='sass' scoped>
#entry
  overflow: auto
  position: relative
  z-index: 0
  header
    z-index: 1
  main
    z-index: 0
    position: relative
</style>
