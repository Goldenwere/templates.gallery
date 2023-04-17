<script setup lang='ts'>
import { reactive } from 'vue'
import { useStore } from '@/src/store'

const store = useStore()
const site = reactive(store.site)
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
</template>

<style scoped lang='sass'>
header
  width: 100%
  height: 4em
  background-color: var(--theme-nav-bg)
  display: flex
  align-items: center
  img
    height: 3em
    margin: auto 0 auto 0.5em
  nav
    margin-left: 0.5em
    display: flex
    font-size: 2em
    a
      color: var(--theme-nav-fg)
      text-decoration: none
      font-weight: bold
      font-family: var(--theme-font-display)
</style>
