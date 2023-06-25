<script setup lang='ts'>
import type SocialContact from '@/src/types/views/shared/socialContact'

import AppPlaceholder from '@/src/components/embeds/appPlaceholder.vue'

const props = defineProps<{
  social: SocialContact,
}>()
</script>

<template lang='pug'>
a.social(
  :href='social.url'
  target='_blank'
  tabindex='0'
  v-tippy='`${social.title}${social.subtitle ? ": " + social.subtitle : ""}`'
)
  img.thumbnail(
    v-if='social.thumbnailUrl'
    :src='social.thumbnailUrl'
  )
  AppPlaceholder(
    v-else
  )
  .text
    p.title {{ social.title }}
    p.subtitle {{ social.subtitle }}
</template>

<style scoped lang='sass'>
.social
  background: var(--theme-home-places-link-bg)
  color: var(--theme-home-places-link-fg)
  text-decoration: none
  display: flex
  padding: 0.5em
  gap: 0.5em
  &:focus
    outline: 1px solid var(--theme-home-places-link-fg)
  .text
    flex: 1 1 auto
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    overflow: hidden
    p
      margin: 0
      overflow: hidden
      text-overflow: ellipsis
      width: 100%
    .title
      font-size: 1.1em
      font-weight: bold
    .subtitle
      font-size: 0.9em
      font-style: italic
</style>
