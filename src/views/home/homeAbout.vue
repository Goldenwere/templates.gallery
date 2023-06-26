<script setup lang='ts'>
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
@import '@/src/styles/mixins.scss'
#about
  @include themeColors(var(--theme-home-about-bg), var(--theme-home-about-fg), var(--theme-home-about-link))
</style>
