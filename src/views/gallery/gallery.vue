<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/src/store'
import { deepCopy } from '@/src/utilities/object'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import type artWork from '@/src/types/artWork'
import type folder from '@/src/types/folder'
import type gallery from '@/src/types/views/gallery'
import GalleryButton from '@/src/components/inputs/GalleryButton.vue'
import GalleryImage from '@/src/components/embeds/GalleryImage.vue'
import GalleryViewer from './galleryViewer.vue'

const props = defineProps<{
  id: string,
  indices?: number[],
}>()

const router = useRouter()
const store = useStore()

const galleryState = reactive({
  /** the folder options mapped from gallery store to a flat array of options */
  folderOptions: [] as object[],
  /** selected indices of variant pieces; this is in order from root downward */
  indices: (props.indices || []) as number[],
  /** the selected folder from the gallery folder list; does not apply if not at root of gallery */
  selectedFolder: '',
  /** the title of the selected variant of indices; does not apply if at root of gallery */
  selectedImageTitle: '',
  /** the selected image for the modal; does not apply/resets if modal not open */
  modalImage: {} as artWork,
  /** whether the modal is open or not */
  modalIsOpen: false,
  /** the current work to display, based off of the current state's indices */
  work: [] as artWork[],
})

const ready = ref(false)
let originalGallery = {} as gallery

// init from cache or from yml
const found = store.galleries.find((other) => other.id === props.id)
if (!found) {
  fetchAndParseYaml(`/content/gallery/${props.id}.yml`)
    .then((contents) => {
      store.$patch({ galleries: [
        ...store.galleries,
        {
          id: props.id,
          gallery: contents as gallery,
        },
      ]})
      originalGallery = contents as gallery
      onLoad(originalGallery, props.indices)
    })
} else {
  originalGallery = found.gallery
  onLoad(originalGallery, props.indices)
}

/**
 * Handles load-related events (loading YAML/cached gallery data or variants)
 * @param galleryContent cached or loaded gallery view data
 * @param indices ordered set of indices for navigating variants from the root of gallery.work
 */
function onLoad(galleryContent: gallery, indices?: number[]) {
  galleryState.indices = deepCopy(indices || [])
  if (galleryState.indices.length === 0) {
    // flattens the folder options to use in an iterable array
    galleryState.folderOptions = flattenFolders(galleryContent.folders || [])
  }
  setContent(galleryContent.work, indices)
  ready.value = true
}

/**
 * Utility to map folder depth to indentation
 * @param original the original display name of the folder
 * @param depth the depth of the folder
 */
function getFolderDisplayName(original: string, depth: number = 0) {
  let padding = ''
  for (let i = 0; i < depth; ++i) {
    padding += '&nbsp;'
  }
  return `${padding}${original}`
}

/**
 * Utility recursive function that flattens folder hierarchy into an array of options
 * @param folders the original folders to map from
 * @param depth the current depth to keep track of for indenting purposes; the initial call should default to 0
 */
function flattenFolders(folders: folder[], depth: number = 0): object[] {
  return folders.flatMap((other) => [
    {
      ...deepCopy(other),
      displayName: getFolderDisplayName(other.displayName || other.id, depth),
      folders: undefined,
      depth,
    },
    ...flattenFolders(other.folders || [], depth + 1)
  ])
}

/**
 * Sets artwork content based on selected variants
 * @param work reference to gallery.work
 * @param indices current indices from param if initially loaded or state if navigating in app
 */
function setContent(work: artWork[], indices?: number[]) {
  // when a folder is selected, the v-for index is no longer accurate to the actual content array to find variants.
  // this maps the original indices onto the artwork so that it can be used when a folder is selected.
  // there is no need to deeply map this, as for nested variants, it will fall back on the v-for index like ususal,
  // since folders are not intended to work alongside variants to begin with
  let newContent = deepCopy(work).map((other, index) => ({ ...other, index, }))
  if (indices) {
    // if there are indices navigated, pull out the variants based on index-path
    const iterator = deepCopy(indices)
    let title = ''
    // iterate over variant indices array
    while (iterator.length > 0) {
      const parent = newContent[iterator[0]]
      // set the title first to make sure it pulls from the parent instead of variants
      title = newContent[iterator[0]].title || 'untitled'
      // then select the variants for display
      newContent = (newContent[iterator[0]].variants as any[]).map((oldValue: artWork) => {
        const newValue = deepCopy(oldValue)

        if (newValue.title === undefined) {
          newValue.title = parent.title
        }
        if (newValue.date === undefined) {
          newValue.date = parent.date
        }
        if (newValue.description === undefined) {
          newValue.description = parent.description
        }

        return newValue
      }) as any[]
      iterator.shift()
    }
    galleryState.selectedImageTitle = title
    galleryState.selectedFolder = ''
  } else if (galleryState.selectedFolder !== '') {
    // if no indices but a folder is selected, filter out artWork that does not match the selected folder
    newContent = newContent.filter((other) => other.folders?.includes(galleryState.selectedFolder))
  }
  galleryState.work = newContent
}

/**
 * Handles gallery navigation events
 * @param event reference to the original event object
 * @param index the index of the variant selected, or a negative number if navigating upward
 * @param piece reference to the variant piece that was selected
 */
function navigate(event: Event, index: number, piece?: artWork) {
  event.preventDefault()
  const originalContent = deepCopy((store.galleries.find((other) => other.id === props.id))?.gallery as gallery)
  const newIndices = deepCopy(props.indices || [])

  if (index < 0) {
    // handle navigation backwards to parent artwork
    newIndices.pop()
    if (newIndices.length < 1) {
      // navigate to the root gallery route (without indices)
      router.push({ name: 'gallery', params: { id: props.id }})
    } else {
      // navigate to the subgallery route with the new indices
      router.push({ name: 'subgallery', params: { id: props.id, indices: newIndices}})
    }
  } else {
    // handle navigation deeper into artwork variants
    newIndices.push(index)
    router.push({ name: 'subgallery', params: { id: props.id, indices: newIndices}})
  }

  // refresh gallery state with new indices
  onLoad(originalContent, newIndices)
}

/**
 * Handles when a folder is selected
 * @param event reference to the original event object
 */
function onSelectFolder(event: Event, option: string) {
  event.preventDefault()
  galleryState.selectedFolder = option
  setContent(originalGallery.work)
}

/**
 * Handles when an image is opened that doesn't have variants but does have a URL
 * @param event reference to the original event object
 * @param piece reference to the variant piece that was selected
 */
function onOpenImage(event: Event, piece: artWork) {
  event.preventDefault()
  if (piece.url?.[0] === '/') {
    // if the url is root, open a modal
    galleryState.modalImage = piece
    galleryState.modalIsOpen = true
  } else {
    // if the url is not root, open it in a new tab
    window.open(piece.url, '_blank')
  }
}

/**
 * Handles when the modal is closed
 * @param event reference to the original event object
 */
function onCloseModal(event: Event) {
  event.preventDefault()
  galleryState.modalImage = {}
  galleryState.modalIsOpen = false
}
</script>

<template lang='pug'>
#gallery(
  v-if='ready && !galleryState.modalIsOpen'
)
  .gallery-nav(
    v-if='galleryState.indices && galleryState.indices.length > 0'
  )
    h2 {{ galleryState.selectedImageTitle }}
    GalleryButton.back(
      @click='navigate($event, -1)'
    ) 
      span &lt; Back
  .gallery-folders(
    v-else-if='galleryState.folderOptions.length > 0'
  )
    h2 Folders
    a(
      @click='onSelectFolder($event, "")'
      v-html='"<i>Main Gallery</i>"'
      :class='{ selected: galleryState.selectedFolder === "" }'
    )
    a(
      v-for='option in galleryState.folderOptions'
      @click='onSelectFolder($event, option.id)'
      v-html='option.displayName'
      :class='{ selected: galleryState.selectedFolder === option.id }'
    )
  .gallery
    .piece(
      v-for='(piece, i) in galleryState.work'
    )
      GalleryImage.link(
        v-if='piece.variants'
        :piece='piece'
        @click='navigate($event, piece.index || i, piece)'
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
GalleryViewer(
  v-if='galleryState.modalIsOpen'
  :image='galleryState.modalImage'
  @close='onCloseModal($event)'
)
</template>

<style scoped lang='sass'>
#gallery
  width: 100%
  height: calc(100vh - 4em)
  overflow-y: auto
.gallery-nav
  margin-left: 0.5em
.gallery-folders
  float: right
  margin-right: 1em
  a
    display: block
    position: relative
    font-size: 1.25em
    margin-bottom: 0.33em
    &:first-of-type
      margin-bottom: 1em
    &.selected
      -webkit-text-stroke-width: 1px
      -webkit-text-stroke-color: var(--theme-link)
      &::before
        content: '►'
        position: absolute
        left: -1em
        top: 0
        bottom: 0
.gallery
  padding: 0.5em
  display: flex
  flex-wrap: wrap
  gap: 1em
  .piece
    flex: 0 0 10em
    width: 10em
    .link
      cursor: pointer
</style>
