<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { useStore } from '@/src/store'

import AppButton from '@/src/components/inputs/appButton.vue'
import AppModal from '@/src/components/inputs/appModal.vue'

const router = useRouter()
const store = useStore()
const warningContent = `
The following gallery contains mature/adult material.
By clicking "Acknowledge" you agree that you are at least 18
and are of age in your country of residence in order to view the gallery's material.
`

function onAcknowledged(event: Event) {
  event.preventDefault()
  store.$patch({ acknowledgedMaturity: true, })
}
</script>

<template lang='pug'>
#warning
  AppModal(
    @close='router.push({ name: "home" })'
  )
    p {{ warningContent }}
    .buttons
      AppButton(
        @click='router.push({ name: "home" })'
      )
        span Go Back
      AppButton(
        @click='onAcknowledged($event)'
      )
        span Acknowledge
</template>

<style scoped lang='sass'>
#warning
  min-height: calc(100vh - 4em)
  .buttons
    display: flex
    justify-content: center
    gap: 0.5em
</style>
