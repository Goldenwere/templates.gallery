<script setup lang='ts'>
import { computed } from 'vue'

import type contractTerm from '@/src/types/views/shared/contractTerm'

import GalleryArticle from '@/src/components/embeds/galleryArticle.vue'

const props = defineProps<{
  depth: number,
  term: contractTerm
}>()

const shouldRecurse = computed(() => {
  return (props.term.terms[0] as contractTerm).title !== undefined
})
</script>

<template lang='pug'>
section.term-container
  h2(
    v-if='depth === 0'
  ) {{ props.term.title }}
  h3(
    v-if='depth === 1'
  ) {{ props.term.title }}
  h4(
    v-if='depth === 2'
  ) {{ props.term.title }}
  h5(
    v-if='depth === 3'
  ) {{ props.term.title }}
  h6(
    v-if='depth === 4'
  ) {{ props.term.title }}

  GalleryArticle.intro(
    v-if='props.term.intro'
    :content='props.term.intro'
  )

  .nested(
    v-if='shouldRecurse'
  )
    TosTerm(
      v-for='nestedTerm in props.term.terms'
      :depth='depth + 1'
      :term='nestedTerm'
    )
  
  .content(
    v-else
  )
    GalleryArticle.term-actual(
      :content='props.term.terms'
    )
    .term-simple
      span In Simple Terms...
      GalleryArticle(
        v-if='props.term.simple'
        :content='props.term.simple'
      )
</template>

<style scoped lang='sass'>
.term-container
  .intro
    width: 48%
  .content
    display: flex
    flex-wrap: nowrap
    gap: 1%
    .term-actual,
    .term-simple
      flex: 0 0 48%
    .term-actual
      color: var(--theme-tos-fg)
    .term-simple
      color: var(--theme-tos-simple-fg)
      max-width: 30em
      span
        margin-top: -0.5em
        font-style: italic
        position: absolute
@media screen and (max-aspect-ratio: 3/4)
  .term-container
    .intro
      max-width: 24rem
    .content
      flex-direction: column
      .term-simple,
      .term-actual
        padding: 2em 1em 0.5em 1em
      .term-actual
        background-color: var(--theme-tos-bg)
      .term-simple
        background-color: var(--theme-tos-simple-bg)
</style>
