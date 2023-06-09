<script setup lang='ts'>
import { computed, nextTick, reactive, ref } from 'vue'
import { type RouteRecordName, useRouter, useRoute } from 'vue-router'

import { amendVariantsWithDefaults, convertGalleryData } from '@/src/utilities/galleryData'
import { deepCopy } from '@/src/utilities/object'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { flattenFolders } from '@/src/utilities/galleryFolder'
import { useStore } from '@/src/store'

import type DirectoryRoute from '@/src/types/views/shared/directoryRoute'
import type GalleryArtWork from '@/src/types/internal/galleryArtWork'
import type GalleryViewModel from '@/src/types/views/gallery'

import AppButton from '@/src/components/inputs/appButton.vue'
import GalleryImage from './galleryImage.vue'
import GalleryFolders from './galleryFolders.vue'
import GalleryWarning from './galleryWarning.vue'

const props = defineProps<{
  variantIds?: string[],
}>()

const router = useRouter()
const route = useRoute()
const store = useStore()

const ready = ref(false)
const directory = computed(() => (route.name as RouteRecordName).toString().replace(/(\w+\:\s)/gm, ''))
const showWarning = computed(() => store.getGalleryConfigByTitle(directory.value)?.mature && !store.acknowledgedMaturity)

const galleryState = reactive({
  folders: [] as object[],
  heading: '',
  selectedFolder: '',
  variantIds: props.variantIds || [],
  work: {} as { [key: string]: GalleryArtWork },
  workToDisplay: [] as GalleryArtWork[],
})

// react to navigation to new gallery
router.afterEach((to, from) => {
  nextTick(() => {
    if (to.name?.toString().includes('gallery')) {
      getGalleryData()
    }
  })
})

getGalleryData()

/**
 * Ensures gallery data is loaded in the store and calls `initializeView` once loaded.
 *
 * This only needs to happen when the component first loads or when the primary gallery id changes
 * (i.e. from navigating to a different gallery from the header while still in the gallery component)
 */
function getGalleryData() {
  const notStored = store.getGalleryById(directory.value) === undefined
  const config = store.getGalleryConfigByTitle(directory.value) as DirectoryRoute
  if (!config) {
    return
  }

  if (notStored) {
    fetchAndParseYaml(`/content/${config.path}.yml`)
    .then((parsed) => {
      const _parsed = parsed as GalleryViewModel
      store.setGalleryById(directory.value, convertGalleryData(_parsed, store.environment.uuidNamespace))
      initializeView()
    })
  } else {
    initializeView()
  }
}

/**
 * Loads the initial gallery view state.
 * 
 * This should happen once gallery data is loaded,
 * and anytime the user navigates to between the hierarchy of variants
 */
function initializeView() {
  // 1. set primary content to state
  galleryState.folders = flattenFolders(store.getGalleryById(directory.value).folders || [])
  galleryState.work = store.getGalleryById(directory.value).work
  // 2. reset other state info
  galleryState.selectedFolder = ''
  
  // 3. prepare to handle variants if navigated to
  // heading does not need to be defined by default as it only shows on variants
  let _heading = ''
  // create a working array to iterate over based off the variantIds
  const _iterator = deepCopy(galleryState.variantIds)
  // create a working copy of the work which will pull out variants based off how deep variantIds points
  let _work = deepCopy(galleryState.work)

  // 4. loop over iterator until there are no more variantIds left
  while (_iterator.length > 0) {
    // keep a copy of the variant being selected
    const _parent = _work[_iterator[0]]
    // set the title based off the selected variant
    _heading = _parent.title || 'Untitled'
    // set the new array of ArtWork as the selected variant's variants
    _work = amendVariantsWithDefaults(_parent)
    // finally remove the first variantId to navigate further down if there are any left
    _iterator.shift()
  }

  // 5. update the gallery view state with the selected work and heading
  galleryState.work = _work
  galleryState.heading = _heading

  initializeDisplayedWork()
  ready.value = true
}

/**
 * Sets the initially displayed work by converting it back to an array and filtering by folder if selected.
 * 
 * This should happen every time the view is initialized,
 * and every time a folder is selected/unselected
 */
function initializeDisplayedWork() {
  galleryState.workToDisplay = Object.values(deepCopy(galleryState.work))
  if (galleryState.selectedFolder !== '' && galleryState.variantIds.length === 0) {
    galleryState.workToDisplay = galleryState.workToDisplay.filter((other) => other.folders?.includes(galleryState.selectedFolder))
  }
}

/**
 * Handler for user selection of a folder
 * @param folder the folder that was selected; an empty string represents a lack of selected folder
 */
function onSelectFolder(folder: string) {
  galleryState.selectedFolder = folder
  initializeDisplayedWork()
}

/**
 * Handler for user navigation of ArtWork/variants
 * @param event reference to the event object that called this method
 * @param id the _id of the ArtWork that was selected
 */
function onNavigate(event: Event, id: string) {
  event.preventDefault()
  const _variantIds = deepCopy(galleryState.variantIds)
  if (id === 'back') {
    // handle navigation backwards to parent ArtWork by removing the most recently pushed variantId
    _variantIds.pop()
    if (_variantIds.length < 1) {
      // navigate to the root gallery route (without variantIds)
      router.push({ name: `gallery: ${directory.value}` })
    } else {
      // navigate to the subgallery route with the new variantIds
      router.push({ name: `subgallery: ${directory.value}`, params: { variantIds: _variantIds }})
    }
  } else {
    // handle navigation into an ArtWork by pushing its id to variantIds and navigating to subgallery route
    _variantIds.push(id)
    router.push({ name: `subgallery: ${directory.value}`, params: { variantIds: _variantIds }})
  }
  // as router won't refresh the page or props, update variantIds and view data
  galleryState.variantIds = _variantIds
  initializeView()
}

/**
 * Handles when an image is opened that doesn't have variants but does have a URL
 * @param event reference to the original event object
 * @param piece reference to the variant piece that was selected
 */
function onOpenImage(event: Event, piece: GalleryArtWork) {
  event.preventDefault()
  if (piece.url?.[0] === '/') {
    // if the url is root, navigate to the view
    router.push({ name: `view: ${directory.value}`, params: { variantIds: [ ...galleryState.variantIds, piece._id ] }})
  } else {
    // if the url is not root, open it in a new tab
    window.open(piece.url, '_blank')
  }
}
</script>

<template lang='pug'>
GalleryWarning(
  v-if='showWarning'
)
#gallery(
  v-else-if='ready'
  :class=`{
    hasNav: galleryState.variantIds.length > 0,
    hasFolders: galleryState.folders.length > 0 && galleryState.variantIds?.length === 0,
  }`
)
  .gallery-nav(
    v-if='galleryState.variantIds.length > 0'
  )
    h2 {{ galleryState.heading }}
    AppButton.back(
      @click='onNavigate($event, "back")'
    )
      span &lt; Back
  GalleryFolders(
    v-else-if='galleryState.folders.length > 0'
    :modelValue='galleryState.selectedFolder'
    @update:modelValue='newValue => onSelectFolder(newValue)'
    :options='galleryState.folders'
  )
  .gallery
    .piece(
      v-for='(piece) in galleryState.workToDisplay'
    )
      GalleryImage.link(
        v-if='piece.variants'
        :piece='piece'
        @click='onNavigate($event, piece._id)'
        @keydown.enter='onNavigate($event, piece._id)'
      )
      GalleryImage.link(
        v-else-if='piece.url'
        :piece='piece'
        @click='onOpenImage($event, piece)'
        @keydown.enter='onOpenImage($event, piece)'
      )
      GalleryImage(
        v-else
        :piece='piece'
      )
</template>

<style scoped lang='sass'>
#gallery
  width: 100%
  min-height: calc(100vh - 4em)
  display: grid
  background: var(--theme-gallery-bg)
  color: var(--theme-gallery-fg)
  /* make space for theme picker */
  margin-bottom: 4em
  &.hasNav
    grid-template-rows: 7em auto
  &.hasFolders
    grid-template-columns: auto 12em
.gallery-nav
  margin-left: 0.5em
.gallery-folders
  grid-row: 1
  grid-column: 2
.gallery
  padding: 0.5em
  display: grid
  grid-template-columns: repeat(auto-fill, 10em)
  grid-template-rows: repeat(auto-fill, 12em)
  gap: 1em
  .piece
    width: 10em
    height: 12em
    .link
      cursor: pointer

@media screen and (max-width: 500px)
  #gallery
    margin-top: 1em
    display: flex
    flex-direction: column
    &.hasFolders
      flex-direction: column-reverse
  .gallery
    justify-content: center
</style>
