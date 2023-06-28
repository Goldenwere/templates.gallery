<script setup lang='ts'>
import AppArticle from '@/src/components/embeds/appArticle.vue'

const props = defineProps<{
  header: {
    description?: string,
    form?: string,
  },
}>()
</script>

<template lang='pug'>
section#commission-header.wide
  h2 Commission Info
  p(
    v-if='header.form'
  ) Commission form:&nbsp;
    a(
      :href='header.form'
      target='_blank'
    ) {{ header.form }}
  AppArticle(
    v-if='header.description'
    :content='header.description'
  )
</template>

<style scoped lang='sass'>
@import './commission.shared.sass'
#commission-header
  padding-top: 2em
</style>
