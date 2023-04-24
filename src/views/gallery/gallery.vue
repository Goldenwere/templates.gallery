<script setup lang='ts'>
import { ref } from 'vue'
import { useStore } from '@/src/store'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import type gallery from '@/src/types/views/gallery'

const props = defineProps<{
  id: string
}>()

const store = useStore()
const ready = ref(false)
const content = ref({} as gallery)
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
      content.value = contents as gallery
      ready.value = true
    })
} else {
  content.value = found.gallery
  ready.value = true
}
</script>

<template lang='pug'>
#gallery(
  v-if='ready'
)
  .element(
    v-for='piece in content.work'
  )
    img(
      v-if='piece.thumbnailUrl'
      :alt='`thumbnail for ${piece.title}`'
      :src='piece.thumbnailUrl'
    )
    p {{ piece.title }}
</template>

<style scoped lang='sass'>
#gallery
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
</style>
