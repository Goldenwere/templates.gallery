<script setup lang='ts'>
import { computed } from 'vue'

import type SocialContact from '@/src/types/views/shared/socialContact'

import HomePlacesLink from './homePlacesLink.vue'

const props = defineProps<{
  socialContacts: SocialContact[]
}>()

const socialMap = computed(() => {
  let mapped: { [key: string]: SocialContact[] } = { 'uncategorized': [] }
  props.socialContacts.forEach((value) => {
    if (value.category === undefined) {
      mapped['uncategorized'].push(value)
    } else if (mapped[value.category] === undefined) {
      mapped[value.category] = [ value ]
    } else {
      mapped[value.category].push(value)
    }
  })

  return mapped
})
</script>

<template lang='pug'>
section#places
  h2 Places
  section(
    v-for='(category, index) in socialMap'
  )
    h3 {{ index }}
    .grid
      HomePlacesLink(
        v-for='social in category'
        :social='social'
      )
</template>

<style scoped lang='sass'>
#places
  background: var(--theme-home-places-bg)
  color: var(--theme-home-places-fg)
  h3
    text-transform: capitalize
  .grid
    width: 100%
    display: flex
    flex-wrap: wrap
    gap: 1em
    justify-content: space-between
    .social
      height: 4em
      flex: 1 1 auto
      max-width: calc(50% - 0.5em)
      :deep(.placeholder),
      :deep(.thumbnail)
        height: 3em
        width: 3em
</style>
