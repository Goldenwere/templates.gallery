<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import type commissionData from '@/src/types/views/commission'

import GalleryArticle from '@/src/components/embeds/galleryArticle.vue'
import GalleryCarousel from '@/src/components/embeds/galleryCarousel.vue'
import GalleryImage from '@/src/components/embeds/galleryImage.vue'

const store = useStore()
const route = useRoute()

const content = reactive(store.commission)

const ready = ref(false)

if (store.commission.commissionTypes === undefined) {
  fetchAndParseYaml('/content/commission.yml')
    .then((content) => {
      store.$patch({ commission: content as commissionData })
      ready.value = true
    })
} else {
  ready.value = true
}
</script>

<template lang='pug'>
#commission(
  v-if='ready'
)
  #header(
    v-if='content.header'
  )
    p(
      v-if='content.header.form'
    ) Commission form:&nbsp;
      a(
        :href='content.header.form'
        target='_blank'
      ) {{ content.header.form }}
    GalleryArticle(
      v-if='content.header.description'
      :content='content.header.description'
    )
  section#types
    h2 Commission Types
    section.type(
      v-for='commission in content.commissionTypes'
    )
      h3 {{ commission.title }}
      span.status(
        v-if='commission.status'
      ) {{ commission.status }}
      GalleryArticle(
        v-if='commission.details'
        :content='commission.details'
      )
      .examples(
        v-if='commission.examples'
      )
        GalleryCarousel(
          :art='commission.examples'
        )
</template>

<style scoped lang='sass'>
@import './commission.mixins.scss'

#commission
  width: 100%
  #header
    width: calc(100% - 6em)
    max-width: 48em
    margin: 2em auto
  #types
    width: calc(100% - 6em)
    max-width: 48em
    margin: auto
    display: flex
    flex-direction: column
    gap: 1em
    .type
      flex: 0 0 100%
      padding: 2em
      &:last-child
        margin-bottom: 2em
</style>
