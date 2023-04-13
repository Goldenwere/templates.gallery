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

</style>
