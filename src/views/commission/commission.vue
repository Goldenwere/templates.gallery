<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import type CommissionViewModel from '@/src/types/views/commission'

import CommissionHeader from './commissionHeader.vue'
import CommissionType from './commissionType.vue'

const store = useStore()
const route = useRoute()

const content = reactive(store.commission)

const ready = ref(false)

if (store.commission.commissionTypes === undefined) {
  fetchAndParseYaml('/content/commission.yml')
    .then((content) => {
      store.$patch({ commission: content as CommissionViewModel })
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
  CommissionHeader(
    v-if='content.header'
    :header='content.header'
  )
  section#commission-types.wide
    h2 Commission Types
    CommissionType(
      v-for='commissionType in content.commissionTypes'
      :commissionType='commissionType'
    )
</template>

<style scoped lang='sass'>
@import '@/src/styles/mixins.scss'
@import './commission.shared.sass'
#commission
  @include themeColors(var(--theme-commission-bg), var(--theme-commission-fg), var(--theme-commission-link))
  /* make space for theme picker */
  margin-bottom: 2em
  width: 100%
  #commission-types
    display: flex
    flex-direction: column
    gap: 1em
    .commission-type
      flex: 0 0 100%
</style>
