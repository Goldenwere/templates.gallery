<script setup lang='ts'>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/src/store'
import type artWork from '@/src/types/artWork'
import type commission from '@/src/types/views/commission'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import GalleryArticle from '@/src/components/embeds/GalleryArticle.vue'
import GalleryImage from '@/src/components/embeds/GalleryImage.vue'

const store = useStore()
const route = useRoute()
const content = reactive(store.commission)
const ready = ref(false)

if (store.commission.commissionTypes === undefined) {
  fetchAndParseYaml('/content/commission.yml')
    .then((content) => {
      const parsed = content as commission
      store.$patch({ commission: parsed })
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
        GalleryImage(
          v-for='example in commission.examples'
          :piece='example'
        )
</template>

<style scoped lang='sass'>
#commission
  width: 100%
  height: calc(100vh - 4em)
  overflow-y: auto
  #header
    width: calc(100% - 6em)
    max-width: 48em
    padding: 2em
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
      display: flex
      flex-wrap: wrap
      &:last-child
        margin-bottom: 2em
      h3
        flex: 0 0 50%
      .status
        flex: 0 0 40%
      article,
      .examples
        flex: 0 0 100%
        display: flex
        .example
          flex: 0 0 25%
</style>
