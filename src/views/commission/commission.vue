<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import { fetchAndParseYaml } from '@/src/utilities/fetch'
import { useStore } from '@/src/store'

import type CommissionViewModel from '@/src/types/views/commission'

import CommissionInfo from './commissionInfo.vue'
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
  CommissionInfo(
    v-if='content.header'
    :info='content.header'
  )
  section#types
    h2 Commission Types
    CommissionType(
      v-for='commissionType in content.commissionTypes'
      :commissionType='commissionType'
    )
</template>

<style scoped lang='sass'>
#commission
  width: 100%
  background: var(--theme-commission-bg)
  color: var(--theme-commission-fg)
  #types
    width: calc(100% - 6em)
    max-width: 48em
    margin: auto
    display: flex
    flex-direction: column
    gap: 1em
</style>
