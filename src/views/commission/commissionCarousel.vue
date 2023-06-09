<script setup lang='ts'>
import { computed, ref } from 'vue'

import type ArtWork from '@/src/types/views/shared/artWork'

import AppButton from '@/src/components/inputs/appButton.vue'

const props = defineProps<{
  art: ArtWork[]
}>()

const selected = ref(0)
const length = computed(() => props.art.length)

/**
 * Handles pagination
 * @param event the original event object that called this function
 * @param direction the direction (negative for left, positive for right; will loop if out of bounds)
 */
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
      :src='art[selected].thumbnailUrl'
      :alt='art[selected].alt'
    )
  .controls
    AppButton(
      v-if='length > 1'
      @click='navigate($event, -1)'
    )
      .svg.left
    span.count {{ selected + 1 }} / {{ length }}
    AppButton(
      v-if='length > 1'
      @click='navigate($event, 1)'
    )
      .svg.right
</template>

<style scoped lang='sass'>
@import '@/src/styles/mixins.scss'

.carousel
  .container
    position: relative
    height: calc(100% - 2.5em)
    width: 100%
    display: flex
    img
      max-height: 100%
      max-width: 100%
      margin: auto
      display: block
  .controls
    height: 2em
    display: flex
    align-items: center
    justify-content: center
    margin-top: 0.5em
    .count
      margin: 0 1em
    .button
      height: 1.5em
      display: flex
      .svg
        width: 0.5em
        height: 90%
        background: var(--theme-input-fg)
      .left
        @include svgMask('/assets/icons/triangle-left.svg')
      .right
        @include svgMask('/assets/icons/triangle-right.svg')
</style>
