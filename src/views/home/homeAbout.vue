<script setup lang='ts'>
import type homeData from '@/src/types/views/home'

import AppArticle from '@/src/components/embeds/appArticle.vue'

const props = defineProps<{
  aboutContent: string
}>()

</script>

<template lang='pug'>
section#about
  h2 About
  AppArticle(
    :content='aboutContent'
  )
</template>

<style scoped lang='sass'>
#about
  background-color: var(--theme-home-about-bg)
  color: var(--theme-home-about-fg)
</style>
