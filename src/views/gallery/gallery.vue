<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/src/store'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import type artWork from '@/src/types/artWork'
import type gallery from '@/src/types/views/gallery'

const props = defineProps<{
  id: string,
  indices?: number[],
}>()

const router = useRouter()
const store = useStore()
const ready = ref(false)
let indices = reactive((props.indices || []) as number[])
let content = reactive([] as artWork[])
const found = store.galleries.find((other) => other.id === props.id)
const modalImage = ref('')
const modalOpen = ref(false)
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
      setContent((contents as gallery).work, props.indices)
    })
} else {
  setContent(found.gallery.work, props.indices)
}

function setContent(work: artWork[], indices?: number[]) {
  content = work
  if (indices) {
    const iterator = [ ... indices ]
    while (iterator.length > 0) {
      content = content[iterator[0]].variants as artWork[]
      iterator.shift()
    }
  }
  ready.value = true
}

function navigate(event: Event, index: number, piece?: artWork) {
  event.preventDefault()
  const originalContent = ((store.galleries.find((other) => other.id === props.id))?.gallery as gallery).work
  const newIndices = [ ...(props.indices || [])]
  if (index < 0) {
    // handle navigation backwards to parent artwork
    newIndices.pop()
    indices = newIndices
    if (indices.length < 1) {
      router.push({ name: 'gallery', params: { id: props.id }})
    } else {
      router.push({ name: 'subgallery', params: { id: props.id, indices: newIndices}})
    }
    setContent(originalContent, newIndices)
  } else if (piece?.variants === undefined) {
    // temporary safety check if variants not defined until better structure for gallery elements set
    return
  } else {
    // handle navigation deeper into artwork variants
    newIndices.push(index)
    indices = newIndices
    router.push({ name: 'subgallery', params: { id: props.id, indices: newIndices}})
    setContent(originalContent, newIndices)
  }
}

function openImage(event: Event, piece: artWork) {
  event.preventDefault()
  if (piece.url?.[0] === '/') {
    modalImage.value = piece.url
    modalOpen.value = true
  } else {
    window.open(piece.url, '_blank')
  }
}

function closeModal(event: Event) {
  modalImage.value = ''
  modalOpen.value = false
}
</script>

<template lang='pug'>
#gallery(
  v-if='ready'
)
  p.back(
    v-if='indices && indices.length > 0'
    @click='navigate($event, -1)'
  ) &lt; Back
  .gallery
    .element(
      v-for='(piece, index) in content'
    )
      .has-variants(
        v-if='piece.variants'
      )
        img(
          v-if='piece.thumbnailUrl'
          :alt='`thumbnail for ${piece.title}`'
          :src='piece.thumbnailUrl'
          @click='navigate($event, index, piece)'
        )
        p {{ piece.title }}
      .has-url(
        v-else-if='piece.url'
      )
        img(
          v-if='piece.thumbnailUrl'
          :alt='`thumbnail for ${piece.title}`'
          :src='piece.thumbnailUrl'
          @click='openImage($event, piece)'
        )
        p {{ piece.title }}
      .no-preview(
        v-else
      )
        img(
          v-if='piece.thumbnailUrl'
          :alt='`thumbnail for ${piece.title}`'
          :src='piece.thumbnailUrl'
        )
        p {{ piece.title }}
.modal(
  v-if='modalOpen'
)
  p(
    @click='closeModal($event)'
  ) Close
  img(
    :src='modalImage'
  )
</template>

<style scoped lang='sass'>

.gallery
  display: flex
  flex-wrap: wrap
  gap: 1em
  .element
    background-color: #000a
    flex: 0 0 10em
    height: auto
    img
      max-height: 12em
      max-width: 9em
      width: auto
      height: auto
      margin: 0.5em auto
      display: block
    p
      text-align: center
      margin: 0 0 0.5em
.has-variants,
.has-url,
  img
    cursor: pointer
.no-preview
  img
    cursor: default
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
