<script setup lang='ts'>
import { computed } from 'vue'
import { type RouteLocationRaw } from 'vue-router'

import type directoryRoute from '@/src/types/views/shared/directoryRoute'
import type siteData from '@/src/types/views/site'

import AppPlaceholder from '@/src/components/embeds/appPlaceholder.vue'

const props = defineProps<{
  site: siteData
}>()

const directories = computed(() => {
  return props.site.directories?.map((directory): { route: RouteLocationRaw, directory: directoryRoute } => {
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
</script>

<template lang='pug'>
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
</template>

<style scoped lang='sass'>
#navigation
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
</style>
