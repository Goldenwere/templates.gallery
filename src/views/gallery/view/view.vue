<script setup lang='ts'>
import { computed, ref } from 'vue'
import { type RouteRecordName, useRouter, useRoute } from 'vue-router'

import { amendVariantWithDefaults, convertGalleryData } from '@/src/utilities/galleryData'
import { deepCopy } from '@/src/utilities/object'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import type directoryRoute from '@/src/types/views/shared/directoryRoute'
import type galleryArtWork from '@/src/types/internal/galleryArtWork'
import type galleryData from '@/src/types/views/gallery'

import ViewArt from './viewArt.vue'

const props = defineProps<{
  variantIds: string[],
}>()

const store = useStore()
const router = useRouter()
const route = useRoute()

const work = ref({} as galleryArtWork)

const ready = ref(false)
const directory = computed(() => (route.name as RouteRecordName).toString().replace(/(\w+\:\s)/gm, ''))

const notStored = store.getGalleryById(directory.value) === undefined
const config = store.getGalleryConfigByTitle(directory.value) as directoryRoute
if (notStored) {
  fetchAndParseYaml(`/content/${config.path}.yml`)
  .then((parsed) => {
    const _parsed = parsed as galleryData
    store.setGalleryById(directory.value, convertGalleryData(_parsed, store.environment.uuidNamespace))
    initializeView()
  })
} else {
  initializeView()
}

/**
 * Initializes view data of the component
 */
function initializeView() {
  const _iterator = deepCopy(props.variantIds)
  const _galleryRef = store.getGalleryById(directory.value)
  let _work = deepCopy(_galleryRef.work[_iterator[0]])
  _iterator.shift()
  while (_iterator.length > 0) {
    _work = amendVariantWithDefaults(_work, (_work.variants as { [key: string]: galleryArtWork })[_iterator[0]])
    _iterator.shift()
  }
  work.value = _work
  ready.value = true
}

/**
 * Handler for navigation back button
 * @param event the event that called this method
 */
function onBack(event: Event) {
  event.preventDefault()
  router.back()
}
</script>

<template lang='pug'>
#view(
  v-if='ready'
)
  ViewArt(
    :piece='work'
    @back='onBack($event)'
  )
</template>

<style scoped lang='sass'>
#view
  background: var(--theme-view-bg)
  color: var(--theme-view-fg)
  min-height: calc(100vh - 4rem)
  padding: 1em 1em
</style>
