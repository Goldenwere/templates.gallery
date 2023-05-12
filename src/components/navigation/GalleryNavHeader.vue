<script setup lang='ts'>
import { reactive, watch } from 'vue'
import { useStore } from '@/src/store'

const store = useStore()
const site = reactive(store.site)

const headerData = reactive({
  hasCommissions: false,
  hasTos: false,
})

watch(site, (oldSite, newSite) => {
  if (newSite.directories !== undefined) {
    headerData.hasCommissions = !!site.directories?.find((other) => other.path === 'commission')
    headerData.hasTos = !!site.directories?.find((other) => other.path === 'tos')
  }
})
</script>

<template lang='pug'>
header
  img(
    :src='site.logo'
  )
  nav
    router-link(
      :to='{ name: "home" }'
    ) 
      span Home
    router-link(
      v-if='headerData.hasCommissions'
      :to='{ name: "commission" }'
    ) Commission
    router-link(
      v-if='headerData.hasTos'
      :to='{ name: "tos" }'
    ) Terms of Service
</template>

<style scoped lang='sass'>
header
  width: 100%
  height: 4em
  background-color: var(--theme-nav-bg)
  display: flex
  align-items: center
  position: relative
  z-index: 99
  img
    height: 3em
    margin: auto 0 auto 0.5em
  nav
    margin-left: 0.5em
    display: flex
    font-size: 2em
    gap: 1em
    a
      color: var(--theme-nav-fg)
      text-decoration: none
      font-weight: bold
      font-family: var(--theme-font-display)
</style>
