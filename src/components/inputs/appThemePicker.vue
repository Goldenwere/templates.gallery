<script setup lang='ts'>
import { ref } from 'vue'
import { useStore } from '@/src/store'
import type AppTheme from '@/src/types/views/shared/appTheme'

const store = useStore()
const themes = ref(store.app.themes)

function onSelectTheme(event: Event, selection: AppTheme) {
  event.preventDefault()
  store.setTheme(selection)
}
</script>

<template lang='pug'>
.theme-picker
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
  .option
    cursor: pointer
</style>