<script setup lang='ts'>
import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { capitalizeFirstLetter } from '@/src/utilities/string'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'
import type site from '@/src/types/views/site'

const store = useStore()
const route = useRoute()
const router = useRouter()

fetchAndParseYaml('/content/site.yml')
  .then(async (content) => {
    store.$patch({ site: content as site })
    await router.isReady()
    document.title = `${capitalizeFirstLetter(route.name as string)} - ${store.site.title}`
    router.afterEach((to, from) => {
      nextTick(() => {
        document.title = `${capitalizeFirstLetter(to.name as string)} - ${store.site.title}`
      })
    })
  })
</script>

<template lang='pug'>
#entry
  main
    router-view
</template>

<style lang='sass' scoped>
#entry
  width: 100vw
  height: 100vh
  overflow: hidden
  position: relative
</style>
