<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useStore } from '@/src/store'
import type AppTheme from '@/src/types/views/shared/appTheme'

const store = useStore()
const themes = ref(store.app.themes)
const darkTheme = ref(store.app.themes?.find((other => other.designation === 'dark' || other.designation === 'dark_high_contrast')))
const lightTheme = ref(store.app.themes?.find((other => other.designation === 'light' || other.designation === 'light_high_contrast')))
const useToggle = computed(() => !!darkTheme.value && !!lightTheme.value && store.app.themes?.length === 2)
const toggled = ref(false)

function onSelectTheme(event: Event, selection: AppTheme) {
  event.preventDefault()
  store.setTheme(selection)
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
    @click='onToggleTheme($event, theme)'
  )
    .button(
      :class='{ "toggled": toggled }'
    )
  .dropdown(
    v-else
  )
    .option(
      v-for='theme in themes'
      @click='onSelectTheme($event, theme)'
    )
      span {{ theme.displayName }}
</template>

<style scoped lang='sass'>
.theme-picker
  position: fixed
  bottom: 0.5em
  right: 0.5em
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
      &.toggled
        transform: translateX(2em)
  .option
    cursor: pointer
</style>