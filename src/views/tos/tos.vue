<script setup lang='ts'>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/src/store'
import type tos from '@/src/types/views/tos'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import GalleryTerm from '@/src/components/embeds/GalleryTerm.vue'

const store = useStore()
const route = useRoute()
const content = reactive(store.tos)
const ready = ref(false)

if (store.tos.terms === undefined) {
  fetchAndParseYaml('/content/tos.yml')
    .then((content) => {
      const parsed = content as tos
      store.$patch({ tos: parsed })
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
  GalleryTerm(
    v-for='term in content.terms'
    :depth='0'
    :term='term'
  )
</template>

<style scoped lang='sass'>
#tos
  width: 100%
  height: calc(100vh - 4em)
  overflow-y: auto
  padding: 2em
</style>
