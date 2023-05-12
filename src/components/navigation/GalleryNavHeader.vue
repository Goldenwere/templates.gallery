<script setup lang='ts'>
import { reactive, ref, watch } from 'vue'
import { useStore } from '@/src/store'
import type directoryRoute from '@/src/types/directoryRoute'

const store = useStore()
const site = reactive(store.site)
const galleryDropdownOpen = ref(false)

const headerData = reactive({
  hasCommissions: false,
  hasTos: false,
  galleries: [] as any[],
})

if (site.directories !== undefined) {
  initialize()
} else {
  watch(site, (oldSite, newSite) => {
    if (newSite.directories !== undefined) {
      initialize()
    }
})
}

function initialize() {
  headerData.hasCommissions = !!site.directories?.find((other) => other.path === 'commission')
  headerData.hasTos = !!site.directories?.find((other) => other.path === 'tos')
  headerData.galleries = site.directories.filter((other) => !['tos', 'commission'].includes(other.path)).map((other) => {
    return {
      route: {
        name: 'gallery',
        params: {
          id: other.path,
        }
      },
      ...other,
    }
  })
}

function onToggleMenu(event: Event, isOpen: boolean) {
  event.preventDefault()
  galleryDropdownOpen.value = isOpen
}
</script>

<template lang='pug'>
header
  router-link.logo-link(
    :to='{ name: "home" }'
  )
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
    span.dropdown(
      @mouseover='onToggleMenu($event, true)'
      @mouseleave='onToggleMenu($event, false)'
    ) Galleries
      .menu(
        v-if='galleryDropdownOpen'
      )
        router-link(
          v-for='gallery in headerData.galleries'
          :to='gallery.route'
        ) {{ gallery.title || gallery.path }}
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
  .logo-link
    outline: none
    &::after
      display: none
    img
      height: 3em
      margin: auto 0 auto 0.5em
  nav
    margin-left: 0.5em
    display: flex
    font-size: 2em
    gap: 1em
    a,
    .dropdown
      color: var(--theme-nav-fg)
      text-decoration: none
      font-weight: bold
      font-family: var(--theme-font-display)
    .dropdown
      position: relative
      cursor: pointer
      .menu
        position: absolute
        display: flex
        flex-direction: column
        height: auto
        width: 8em
        padding: 1em
        background-color: black
        font-size: 0.9em
        z-index: 1
        a
          margin-bottom: 0.5em
          &:last-child
            margin-bottom: 0.25em
</style>
