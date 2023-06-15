<script setup lang='ts'>
import AppArticle from '@/src/components/embeds/appArticle.vue'

const props = defineProps<{
  info: {
    description?: string,
    form?: string,
  },
}>()
</script>

<template lang='pug'>
#commission-info
  p(
    v-if='info.form'
  ) Commission form:&nbsp;
    a(
      :href='info.form'
      target='_blank'
    ) {{ info.form }}
  AppArticle(
    v-if='info.description'
    :content='info.description'
  )
</template>

<style scoped lang='sass'>
#commission-info
  width: calc(100% - 6em)
  max-width: 48em
  margin: 0 auto 2em
  padding-top: 2em
</style>