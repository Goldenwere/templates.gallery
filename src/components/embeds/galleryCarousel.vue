<script setup lang='ts'>
import { computed, ref } from 'vue'

import type artWork from '@/src/types/views/shared/artWork'

import GalleryButton from '../inputs/galleryButton.vue'

const props = defineProps<{
  art: artWork[]
}>()

const selected = ref(0)
const length = computed(() => props.art.length)

function navigate(event: Event, direction: number) {
  event.preventDefault()
  let newIndex = selected.value + direction
  if (newIndex < 0) {
    newIndex = length.value - 1
  } else if (newIndex >= length.value) {
    newIndex = 0
  }
  selected.value = newIndex
}
</script>

<template lang='pug'>
.carousel
  .container
    img(
      :src='props.art[selected].thumbnailUrl'
      :alt='props.art[selected].alt'
    )
  .controls
    GalleryButton(
      v-if='length > 1'
      @click='navigate($event, -1)'
    )
      .svg.left
    span.count {{ selected + 1 }} / {{ length }}
    GalleryButton(
      v-if='length > 1'
      @click='navigate($event, 1)'
    )
      .svg.right
</template>

<style scoped lang='sass'>
.carousel
  .container
    position: relative
    height: calc(100% - 4em)
    width: 100%
    display: flex
    img
      max-height: 100%
      max-width: 100%
      margin: auto
      display: block
  .controls
    height: 4em
    display: flex
    align-items: center
    justify-content: center
    .count
      margin: 0 1em
    .button
      height: 1.5em
      display: flex
      .svg
        margin: auto
        width: 0.5em
        height: 90%
        background-color: var(--theme-input-fg)
        mask-position: center center
        mask-size: 100% 100%
      .left
        -webkit-mask-image: url('/assets/icons/triangle-left.svg')
        mask-image: url('/assets/icons/triangle-left.svg')
      .right
        -webkit-mask-image: url('/assets/icons/triangle-right.svg')
        mask-image: url('/assets/icons/triangle-right.svg')
</style>
