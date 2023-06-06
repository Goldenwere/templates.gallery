<script setup lang='ts'>
defineProps<{
  text?: string,
}>()
</script>

<template lang='pug'>
.placeholder
  span {{ text || 'No Image' }}
</template>

<style scoped lang='sass'>
.placeholder
  display: flex
  padding: 0.5em
  background-color: var(--theme-placeholder-bg)
  align-items: center
  justify-content: center
  span
    color: var(--theme-placeholder-fg)
    text-align: center
</style>