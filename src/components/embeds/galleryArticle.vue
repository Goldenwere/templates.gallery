<script setup lang='ts'>
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

const parsed = computed(() => {
  return marked.parse(props.content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,''))
})
</script>

<template lang='pug'>
article(
  v-html='parsed'
)
</template>

<style scoped lang='sass'>
@media screen and (max-aspect-ratio: 3/4)
  article
    :deep(ul)
      padding-left: 1em
    :deep(p)
      margin-top: 0
    :deep(p:last-child)
      margin-bottom: 0
</style>
