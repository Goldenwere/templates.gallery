<script setup lang='ts'>
import type CommissionType from '@/src/types/views/shared/commissionType'

import AppArticle from '@/src/components/embeds/appArticle.vue'
import CommissionCarousel from './commissionCarousel.vue'

const props = defineProps<{
  commissionType: CommissionType,
}>()
</script>

<template lang='pug'>
section.type(
  :class='{ "no-example": commissionType.examples === undefined }'
)
  h3 {{ commissionType.title }}
  span.status(
    v-if='commissionType.status'
  ) {{ commissionType.status }}
  AppArticle(
    v-if='commissionType.details'
    :content='commissionType.details'
  )
  .examples(
    v-if='commissionType.examples'
  )
    CommissionCarousel(
      :art='commissionType.examples'
    )
</template>

<style scoped lang='sass'>
@import './commissionType.scss'

.type
  flex: 0 0 100%
  padding: 2em
  &:last-child
    margin-bottom: 2em

@media screen and (max-aspect-ratio: 2/3)
  .type
    padding: 1em
</style>