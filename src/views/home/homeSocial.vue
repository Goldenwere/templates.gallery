<script setup lang='ts'>
import { computed } from 'vue'

import type socialContact from '@/src/types/views/shared/socialContact'

import HomeSocialLink from './homeSocialLink.vue'

const props = defineProps<{
  socialContacts: socialContact[]
}>()

const socialMap = computed(() => {
  let mapped: { [key: string]: socialContact[] } = { 'uncategorized': [] }
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
      HomeSocialLink(
        v-for='social in category'
        :social='social'
      )
</template>

<style scoped lang='sass'>
#places
  background-color: var(--theme-home-places-bg)
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
      max-width: 48%
</style>
