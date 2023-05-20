<script setup lang='ts'>

</script>

<template lang='pug'>
button.button
  slot
</template>

<style scoped lang='sass'>
.button
  border: var(--theme-input-border)
  background-color: var(--theme-input-bg)
  color: var(--theme-input-fg)
  font-size: 1.2em
  padding: 0.25em 0.75em
  cursor: pointer
  &:focus
    border: var(--theme-input-border-focus)
  &:hover
    background-color: var(--theme-input-bg-hover)
    color: var(--theme-input-fg-hover)
  &:active
    border: var(--theme-input-border-active)
</style>
