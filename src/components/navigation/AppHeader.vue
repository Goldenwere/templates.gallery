<script setup lang='ts'>
import { reactive, ref, watch } from 'vue'
import { useStore } from '@/src/store'
import type directoryRoute from '@/src/types/views/shared/directoryRoute'

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

/**
 * Handles initializing the view data
 */
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

/**
 * Handles toggling the dropdown menu
 * @param event the event that called this function
 * @param isOpen whether the dropdown menu is open
 */
function onToggleMenu(event: Event, isOpen: boolean) {
  event?.preventDefault()
  if (event === null) {
    (document.querySelector('.logo-link') as HTMLElement).focus()
    galleryDropdownOpen.value = false
    return
  }
  if (
    (document.activeElement?.classList.contains('dropdown') ||
    document.activeElement?.classList.contains('dropdown-link'))
  ) {
    galleryDropdownOpen.value = true
    return
  }
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
      @focusin='onToggleMenu($event, true)'
      @focusout='onToggleMenu($event, false)'
      tabindex='0'
    ) Galleries
      .menu(
        :class='{ visible: galleryDropdownOpen }'
      )
        router-link.dropdown-link(
          v-for='gallery in headerData.galleries'
          :to='gallery.route'
          :tabindex='galleryDropdownOpen ? 0 : 1'
          @focusout='onToggleMenu($event, false)'
          @click='onToggleMenu(null, false)'
          @keydown.enter='onToggleMenu(null, false)'
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
  .logo-link
    outline: 1px solid transparent
    height: 3em
    margin: auto 0 auto 0.5em
    &::after
      display: none
    &:focus
      outline: 1px solid var(--theme-nav-fg)
    img
      height: 100%
      width: 3em
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
      &:focus
        outline: 1px solid var(--theme-nav-fg)
    .dropdown
      position: relative
      cursor: pointer
      .menu
        position: absolute
        display: flex
        flex-direction: column
        height: auto
        width: 8em
        padding: 0.5em
        background-color: var(--theme-nav-bg)
        border: solid 1px var(--theme-nav-fg)
        font-size: 0.9em
        z-index: 1
        opacity: 0
        pointer-events: none
        &.visible
          opacity: 1
          pointer-events: all
        a
          margin-bottom: 0.5em
          &:last-child
            margin-bottom: 0.25em
@media screen and (max-width: 820px)
  header
    nav
      font-size: 1.25em
</style>
