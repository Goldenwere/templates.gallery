<script setup lang='ts'>
import { nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { v5 as uuidv5 } from 'uuid'
import { useStore } from '@/src/store'
import { deepCopy } from '@/src/utilities/object'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import type artWork from '@/src/types/artWork'
import type folder from '@/src/types/folder'
import type gallery from '@/src/types/views/gallery'
import type galleryArtWork from '@/src/types/galleryArtWork'
import type galleryContent from '@/src/types/galleryContent'
import { GalleryDataUtilities } from './utilities/GalleryDataUtilities'
import { GalleryFolderUtilities } from './utilities/GalleryFolderUtilities'
import GalleryButton from '@/src/components/inputs/GalleryButton.vue'
import GalleryImage from '@/src/components/embeds/GalleryImage.vue'
import GalleryFolders from './galleryFolders.vue'
import GalleryViewer from './galleryViewer.vue'

const props = defineProps<{
  id: string,
  variantIds?: string[],
}>()

const router = useRouter()
const store = useStore()

const ready = ref(false)
const galleryState = reactive({
  folders: [] as object[],
  heading: '',
  selectedFolder: '',
  variantIds: props.variantIds || [],
  work: {} as { [key: string]: galleryArtWork },
  workToDisplay: [] as galleryArtWork[],
})

// react to navigation to new gallery
router.afterEach((to, from) => {
  nextTick(() => {
    // only load if the gallery id changes (i.e. /gallery/{id}, [0] = '', [1] = 'gallery', [2] = {id})
    if (to.fullPath.split('/')[2] !== from.fullPath.split('/')[2]) {
      getGalleryData()
    }
  })
})

getGalleryData()

function getGalleryData() {
  const notStored = store.getGalleryById(props.id) === undefined
  if (notStored) {
    fetchAndParseYaml(`/content/gallery/${props.id}.yml`)
    .then((parsed) => {
      const _parsed = parsed as gallery
      store.setGalleryById(props.id, GalleryDataUtilities.convertGalleryData(_parsed, store.environment.uuidNamespace))
      initializeView()
    })
  } else {
    initializeView()
  }
}

function initializeView() {
  galleryState.folders = GalleryFolderUtilities.flattenFolders(store.getGalleryById(props.id).folders || [])
  galleryState.work = store.getGalleryById(props.id).work
  galleryState.selectedFolder = ''
  initializeContent()
  ready.value = true
}

function initializeContent() {
  let _heading = props.id

  const _iterator = deepCopy(galleryState.variantIds)
  let _work = deepCopy(galleryState.work)
  while (_iterator.length > 0) {
    const _parent = _work[_iterator[0]]
    _heading = _parent.title || 'Untitled'
    _work = GalleryDataUtilities.amendVariantsWithDefaults(_parent)
    _iterator.shift()
  }

  galleryState.heading = _heading
  galleryState.work = _work

  initializeDisplayedWork()
}

function initializeDisplayedWork() {
  galleryState.workToDisplay = Object.values(deepCopy(galleryState.work))
  if (galleryState.selectedFolder !== '' && galleryState.variantIds.length === 0) {
    galleryState.workToDisplay = galleryState.workToDisplay.filter((other) => other.folders?.includes(galleryState.selectedFolder))
  }
}

function onSelectFolder(option: string) {
  galleryState.selectedFolder = option
  initializeDisplayedWork()
}

function onNavigate(event: Event, id: string) {
  event.preventDefault()
  const _variantIds = deepCopy(galleryState.variantIds)
  if (id === 'back') {
    // handle navigation backwards to parent artwork
    _variantIds.pop()
    if (_variantIds.length < 1) {
      // navigate to the root gallery route (without indices)
      router.push({ name: 'gallery', params: { id: props.id }})
    } else {
      // navigate to the subgallery route with the new indices
      router.push({ name: 'subgallery', params: { id: props.id, variantIds: _variantIds }})
    }
  } else {
    _variantIds.push(id)
    router.push({ name: 'subgallery', params: { id: props.id, variantIds: _variantIds }})
  }
  galleryState.variantIds = _variantIds
  initializeView()
}
</script>

<template lang='pug'>
#gallery(
  v-if='ready'
  :class=`{
    hasNav: galleryState.variantIds.length > 0,
    hasFolders: galleryState.folders.length > 0 && galleryState.variantIds?.length === 0,
  }`
)
  .gallery-nav(
    v-if='galleryState.variantIds.length > 0'
  )
    h2 {{ galleryState.heading }}
    GalleryButton.back(
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
      )
      GalleryImage.link(
        v-else-if='piece.url'
        :piece='piece'
        @click='onOpenImage($event, piece)'
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
</style>
