<script setup lang='ts'>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import type tosData from '@/src/types/views/tos'

import TosTerm from './tosTerm.vue'

const store = useStore()
const route = useRoute()

const content = reactive(store.tos)

const ready = ref(false)

if (store.tos.terms === undefined) {
  fetchAndParseYaml('/content/tos.yml')
    .then((content) => {
      store.$patch({ tos: content as tosData })
      ready.value = true
    })
} else {
  ready.value = true
}
</script>

<template lang='pug'>
#tos(
  v-if='ready'
)
  p(
    v-if='content.lastUpdated'
  ) Last Updated: {{ content.lastUpdated }}
  .background
    .actual
    .simple
  TosTerm(
    v-for='term in content.terms'
    :depth='0'
    :term='term'
  )
</template>

<style scoped lang='sass'>
@import '@/src/styles/mixins.scss'
#tos
  width: 100%
  padding: 2em
  background: var(--theme-tos-bg)
  color: var(--theme-tos-fg)
  z-index: 1
  position: relative
  .background
    z-index: -1
    pointer-events: none
    position: fixed
    @include positioning(0, 0, 0, 0)
    display: flex
    .actual
      background: var(--theme-tos-bg)
      flex: 0 0 48%
    .simple
      background: var(--theme-tos-simple-bg)
      flex: 0 0 48%
      max-width: 32em
@media screen and (max-aspect-ratio: 3/4)
  #tos
    .background
      display: none
</style>
