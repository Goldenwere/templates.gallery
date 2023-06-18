<script setup lang='ts'>
import { computed, nextTick, ref } from 'vue'
import { type RouteLocationNormalized, useRoute, useRouter } from 'vue-router'

import { capitalizeFirstLetter } from '@/src/utilities/string'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import AppHeader from './components/navigation/appHeader.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const showHeader = computed(() => {
  return ready.value && route.name !== 'home' && !store.hideHeader
})
const ready = ref(false)

async function init() {
  await router.isReady()
  setTitle(route)
  router.afterEach((to, from) => {
    nextTick(() => {
      setTitle(to)
    })
  })
  ready.value = true
}

init()

/**
 * Sets the title of the document based on current route
 * @param route the current route
 */
function setTitle(route: RouteLocationNormalized) {
  const name = (route.name === 'gallery' || route.name === 'subgallery')
    ? `${capitalizeFirstLetter(route.params.id as string)} - Gallery`
    : capitalizeFirstLetter(route.name as string)
  document.title = `${name} - ${store.app.title}`
}
</script>

<template lang='pug'>
#entry
  AppHeader(
    v-if='showHeader'
  )
  main
    router-view(
      v-if='ready'
    )
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
