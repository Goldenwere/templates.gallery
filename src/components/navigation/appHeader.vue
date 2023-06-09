<script setup lang='ts'>
import { reactive, ref, watch } from 'vue'
import { useStore } from '@/src/store'

import AppNavButton from './appNavButton.vue'

const store = useStore()
const app = reactive(store.app)
const galleryDropdownOpen = ref(false)
const isOpen = ref(false)

const headerData = reactive({
  mainLinks: [] as string[],
  galleries: [] as {
    routeName: string,
    routeTitle: string,  
  }[],
})

initialize()

/**
 * Handles initializing the view data
 */
function initialize() {
  headerData.galleries = app.directories.filter((other) => other.template === 'gallery' || other.template === undefined).map((other) => {
    return {
      routeName: `gallery: ${other.title}`,
      routeTitle: other.title || other.path,
    }
  })
  headerData.mainLinks = app.directories.filter((other) => !!other.template && other.template !== 'gallery').map((other) => {
    return other.title
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

/**
 * Handler for when the navigation button is toggled
 */
function onToggleNavigation(state: boolean) {
  isOpen.value = state
}
</script>

<template lang='pug'>
header(
  :class='{ "is-open": isOpen }'
)
  router-link.logo-link(
    :to='{ name: "home" }'
  )
    img(
      :src='app.logo'
    )
  AppNavButton(
    @stateChanged='onToggleNavigation($event)'
  )
  nav
    router-link(
      :to='{ name: "home" }'
    ) 
      span Home
    router-link(
      v-for='link in headerData.mainLinks'
      :to='{ name: link }'
    ) {{ link }}
    router-link(
      v-if='headerData.galleries.length === 1'
      :to='{ name: headerData.galleries[0].routeName }'
    ) {{ headerData.galleries[0].routeTitle }}
    span.dropdown(
      v-else
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
          :to='{ name: gallery.routeName }'
          :tabindex='galleryDropdownOpen ? 0 : 1'
          @focusout='onToggleMenu($event, false)'
          @click='onToggleMenu(null, false)'
          @keydown.enter='onToggleMenu(null, false)'
        ) {{ gallery.routeTitle }}
</template>

<style scoped lang='sass'>
header
  width: 100%
  height: 4em
  background: var(--theme-nav-bg)
  display: flex
  align-items: center
  position: relative
  .nav-button
    display: none
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

@media screen and (max-aspect-ratio: 3/4)
  header
    background: unset
    height: unset
    .nav-button
      display: block
    .logo-link
      display: none
    nav
      padding: 1em
      margin: 0
      transition: 0.5s left var(--theme-transition-function)
      flex-direction: column
      position: absolute
      width: 100vw
      top: 3.5em
      left: -200vw
      background: var(--theme-nav-bg)
    &.is-open
      nav
        left: 0
</style>
