<script setup lang='ts'>
import { computed, ref } from 'vue'
import type artWork from '@/src/types/artWork'

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
  img(
    :src='props.art[selected].thumbnailUrl'
    :alt='props.art[selected].alt'
  )
  .controls
    button(
      v-if='length > 1'
      @click='navigate($event, -1)'
    ) &lt;
    span {{ selected + 1 }} / {{ length }}
    button(
      v-if='length > 1'
      @click='navigate($event, 1)'
    ) &gt;
</template>

<style scoped lang='sass'>
.carousel
  img
    max-height: calc(100% - 4em)
    max-width: 100%
    margin: auto
    display: block
  .controls
    height: 4em
    display: flex
    align-items: center
    justify-content: center
</style>
