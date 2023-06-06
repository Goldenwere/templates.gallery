<script setup lang='ts'>
import type socialContact from '@/src/types/views/shared/socialContact'
import AppPlaceholder from '@/src/components/embeds/appPlaceholder.vue'

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
    v-if='props.social.thumbnailUrl'
    :src='props.social.thumbnailUrl'
  )
  AppPlaceholder(
    v-else
  )
  .text
    p.title {{ props.social.title }}
    p.subtitle {{ props.social.subtitle }}
</template>

<style scoped lang='sass'>
.social
  background: var(--theme-social-bg)
  color: var(--theme-social-fg)
  text-decoration: none
  display: flex
  .placeholder,
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
