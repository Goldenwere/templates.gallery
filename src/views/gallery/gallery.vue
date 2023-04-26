<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/src/store'
import { deepCopy } from '@/src/utilities/object'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import type artWork from '@/src/types/artWork'
import type gallery from '@/src/types/views/gallery'
import GalleryButton from '@/src/components/inputs/GalleryButton.vue'
import GalleryImage from '@/src/components/embeds/GalleryImage.vue'

const props = defineProps<{
  id: string,
  indices?: number[],
}>()

const router = useRouter()
const store = useStore()

const galleryState = reactive({
  /** selected indices of variant pieces; this is in order from root downward */
  indices: (props.indices || []) as number[],
  /** the title of the selected variant of indices; does not apply if at root of gallery */
  selectedImageTitle: '',
  /** the source of the selected image; does not apply/resets if modal not open */
  modalImageSrc: '',
  /** whether the modal is open or not */
  modalIsOpen: false,
  /** the current work to display, based off of the current state's indices */
  work: [] as artWork[],
})

const ready = ref(false)

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
      onLoad(contents as gallery, props.indices)
    })
} else {
  onLoad(found.gallery, props.indices)
}

/**
 * Handles load-related events (loading YAML/cached gallery data or variants)
 * @param galleryContent cached or loaded gallery view data
 * @param indices ordered set of indices for navigating variants from the root of gallery.work
 */
function onLoad(galleryContent: gallery, indices?: number[]) {
  galleryState.indices = deepCopy(indices || [])
  setContent(galleryContent.work, indices)
  ready.value = true
}

/**
 * Sets artwork content based on selected variants
 * @param work reference to gallery.work
 * @param indices current indices from param if initially loaded or state if navigating in app
 */
function setContent(work: artWork[], indices?: number[]) {
  let newContent = deepCopy(work)
  if (indices) {
    const iterator = deepCopy(indices)
    let title = ''
    // iterate over variant indices array
    while (iterator.length > 0) {
      // set the title first to make sure it pulls from the parent instead of variants
      title = newContent[iterator[0]].title || 'untitled'
      // then select the variants for display
      newContent = newContent[iterator[0]].variants as artWork[]
      iterator.shift()
    }
    galleryState.selectedImageTitle = title
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
 * Handles when an image is opened that doesn't have variants but does have a URL
 * @param event reference to the original event object
 * @param piece reference to the variant piece that was selected
 */
function onOpenImage(event: Event, piece: artWork) {
  event.preventDefault()
  if (piece.url?.[0] === '/') {
    // if the url is root, open a modal
    galleryState.modalImageSrc = piece.url
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
  galleryState.modalImageSrc = ''
  galleryState.modalIsOpen = false
}
</script>

<template lang='pug'>
#gallery(
  v-if='ready'
)
  .gallery-nav(
    v-if='galleryState.indices && galleryState.indices.length > 0'
  )
    h2 {{ galleryState.selectedImageTitle }}
    GalleryButton.back(
      @click='navigate($event, -1)'
    ) 
      span &lt; Back
  .gallery
    .piece(
      v-for='(piece, index) in galleryState.work'
    )
      GalleryImage.link(
        v-if='piece.variants'
        :piece='piece'
        @click='navigate($event, index, piece)'
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
.modal(
  v-if='galleryState.modalIsOpen'
)
  p(
    @click='onCloseModal($event)'
  ) Close
  img(
    :src='galleryState.modalImageSrc'
  )
</template>

<style scoped lang='sass'>

.gallery
  padding: 0.5em
  display: flex
  flex-wrap: wrap
  gap: 1em
  .piece
    flex: 0 0 10em
    .link
      cursor: pointer
.modal
  background-color: #000a
  position: absolute
  top: 1em
  bottom: 1em
  left: 1em
  right: 1em
  img
    max-height: 80%
    max-width: 80%
    margin: auto
    width: auto
    height: auto
    display: block
  p
    cursor: pointer
    text-align: center
</style>
