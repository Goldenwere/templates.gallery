<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/src/store'
import { deepCopy } from '@/src/utilities/object'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import type artWork from '@/src/types/artWork'
import type gallery from '@/src/types/views/gallery'
import GalleryImage from '@/src/components/embeds/GalleryImage.vue'

const props = defineProps<{
  id: string,
  indices?: number[],
}>()

const router = useRouter()
const store = useStore()

const galleryState = reactive({
  indices: (props.indices || []) as number[],
  modalImageSrc: '',
  modalIsOpen: false,
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

function onLoad(galleryContent: gallery, indices?: number[]) {
  galleryState.indices = deepCopy(indices || [])
  setContent(galleryContent.work, indices)
  ready.value = true
  console.log(galleryState)
}

function setContent(work: artWork[], indices?: number[]) {
  let newContent = deepCopy(work)
  if (indices) {
    const iterator = deepCopy(indices)
    while (iterator.length > 0) {
      newContent = newContent[iterator[0]].variants as artWork[]
      iterator.shift()
    }
  }
  galleryState.work = newContent
}

function navigate(event: Event, index: number, piece?: artWork) {
  event.preventDefault()
  const originalContent = deepCopy((store.galleries.find((other) => other.id === props.id))?.gallery as gallery)
  const newIndices = deepCopy(props.indices || [])

  if (index < 0) {
    // handle navigation backwards to parent artwork
    newIndices.pop()
    if (newIndices.length < 1) {
      router.push({ name: 'gallery', params: { id: props.id }})
    } else {
      router.push({ name: 'subgallery', params: { id: props.id, indices: newIndices}})
    }
  } else {
    // handle navigation deeper into artwork variants
    newIndices.push(index)
    router.push({ name: 'subgallery', params: { id: props.id, indices: newIndices}})
  }

  onLoad(originalContent, newIndices)
}

function onOpenImage(event: Event, piece: artWork) {
  event.preventDefault()
  if (piece.url?.[0] === '/') {
    galleryState.modalImageSrc = piece.url
    galleryState.modalIsOpen = true
  } else {
    window.open(piece.url, '_blank')
  }
}

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
  p.back(
    v-if='galleryState.indices && galleryState.indices.length > 0'
    @click='navigate($event, -1)'
  ) &lt; Back
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
