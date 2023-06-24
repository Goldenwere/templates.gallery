<script setup lang='ts'>
import { computed, ref } from 'vue'

import { useStore } from '@/src/store'

import type AppTheme from '@/src/types/views/shared/appTheme'

import AppDropdown from './appDropdown.vue'

const store = useStore()
const themesDropdownOptions = computed(() => store.app.themes?.map(theme => ({ id: theme.location, displayName: theme.displayName })))
const selectedTheme = ref(store.app.themes?.[0].location)
const darkTheme = ref(store.app.themes?.find((other => other.designation === 'dark' || other.designation === 'dark_high_contrast')))
const lightTheme = ref(store.app.themes?.find((other => other.designation === 'light' || other.designation === 'light_high_contrast')))
const useToggle = computed(() => !!darkTheme.value && !!lightTheme.value && store.app.themes?.length === 2)
const toggled = ref(false)
const useDarkIcon = computed(() => !!store.currentTheme && (store.currentTheme.designation === 'dark' || store.currentTheme.designation === 'dark_high_contrast'))

function onSelectTheme(selection: string) {
  store.setTheme(store.app.themes?.find((other => other.location === selection)) as AppTheme)
  selectedTheme.value = selection
}

function onToggleTheme(event: Event) {
  switch (store.currentTheme.designation) {
    case 'dark':
    case 'dark_high_contrast':
      store.setTheme(lightTheme.value as AppTheme)
      break
    default:
      store.setTheme(darkTheme.value as AppTheme)
  }
  toggled.value = !toggled.value
}
</script>

<template lang='pug'>
.theme-picker
  .toggle(
    v-if='useToggle'
    tabindex='0'
    @click='onToggleTheme($event, theme)'
  )
    .button(
      :class='{ "toggled": toggled, "dark": useDarkIcon }'
    )
      .svg
  AppDropdown(
    v-else
    label='Theme'
    id='theme-dropdown'
    :options='themesDropdownOptions'
    :modelValue='selectedTheme'
    @update:modelValue='onSelectTheme($event)'
  )
</template>

<style scoped lang='sass'>
@import '@/src/styles/mixins.scss'

.theme-picker
  position: fixed
  bottom: 0.5em
  right: 0.5em
  opacity: 0.5
  &:hover,
  &:focus
    opacity: 1
  .toggle
    background-color: #aaaaaa
    width: 4em
    height: 2em
    border-radius: 1em
    position: relative
    cursor: pointer
    .button
      background-color: white
      width: 2em
      height: 2em
      left: 0
      border-radius: 50%
      position: absolute
      display: flex
      .svg
        width: 80%
        height: 80%
        background: black
        @include svgMask('/assets/icons/sun.svg')
      &.toggled
        transform: translateX(2em)
      &.dark
        .svg
          @include svgMask('/assets/icons/moon.svg')
  .option
    cursor: pointer
</style>
