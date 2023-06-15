<script setup lang='ts'>
const props = defineProps<{
  title: string,
}>()
</script>

<template lang='pug'>
.titlebar
  h2 {{ title }}
  slot
</template>

<style scoped lang='sass'>
.titlebar
  display: flex
  align-items: center
  margin-bottom: 1em
  gap: 0.5em
  h2
    margin: 0
    margin-right: auto
  .button
    white-space: nowrap

@media screen and (max-aspect-ratio: 5/6)
  .titlebar
    flex-wrap: wrap
    justify-content: center
    h2
      width: 100%
      flex: 0 0 100%
</style>
