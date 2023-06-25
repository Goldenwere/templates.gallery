<script setup lang='ts'>
import { type ComputedRef, computed } from 'vue'
import { type RouteRecordRaw } from 'vue-router'

import { getRoute } from '@/src/router'

import type DirectoryRoute from '@/src/types/views/shared/directoryRoute'

import AppPlaceholder from '@/src/components/embeds/appPlaceholder.vue'

const props = defineProps<{
  directories: DirectoryRoute[]
}>()

const navigationRoutes: ComputedRef<(DirectoryRoute | RouteRecordRaw)[]> = computed(() => {
  return props.directories.map((directory) => {
    return {
      ...directory,
      ...getRoute(directory),
    }
  })
})
</script>

<template lang='pug'>
nav#navigation
  h2 Navigation
  .link(
    v-for='navigationRoute in navigationRoutes'
  )
    img(
      v-if='navigationRoute.thumbnailUrl'
      :src='navigationRoute.thumbnailUrl'
    )
    AppPlaceholder(
      v-else
    )
    router-link(
      :to='{ name: navigationRoute.name }'
    ) {{ navigationRoute.title }}
</template>

<style scoped lang='sass'>
#navigation
  background: var(--theme-home-nav-bg)
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
    a
      color: var(--theme-home-nav-link)
</style>
