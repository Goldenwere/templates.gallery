<script setup lang='ts'>
import type socialContact from '@/src/types/views/shared/socialContact'

const props = defineProps<{
  social: socialContact
}>()
</script>

<template lang='pug'>
a.social(
  :href='props.social.url'
  target='_blank'
  tabindex='0'
)
  img.thumbnail(
    :src='props.social.thumbnailUrl'
  )
  .text
    p.title {{ props.social.title }}
    p.subtitle {{ props.social.subtitle }}
</template>

<style scoped lang='sass'>
.social
  background-color: var(--theme-social-bg)
  color: var(--theme-social-fg)
  text-decoration: none
  display: flex
  .thumbnail
    aspect-ratio: 1/1
    margin: 0.5em
  .text
    flex: 1 1 auto
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    p
      margin: 0
    .title
      font-size: 1.1em
      font-weight: bold
    .subtitle
      font-size: 0.9em
      font-style: italic
</style>
