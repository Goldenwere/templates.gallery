<script setup lang='ts'>
const props = defineProps<{
  modelValue: string,
  options: {
    id: string,
    displayName: string,
  }
}>()
const emits = defineEmits(['update:modelValue'])

function onSelectFolder(event: Event, option: string) {
  event.preventDefault()
  emits('update:modelValue', option)
}
</script>

<template lang='pug'>
.gallery-folders
  h2 Folders
  a(
    @click='onSelectFolder($event, "")'
    v-html='"<i>Main Gallery</i>"'
    :class='{ selected: modelValue === "" }'
  )
  a(
    v-for='option in options'
    @click='onSelectFolder($event, option.id)'
    v-html='option.displayName || option.id'
    :class='{ selected: modelValue === option.id }'
  )
</template>

<style scoped lang='sass'>
.gallery-folders
  padding-left: 2em
  background-color: var(--theme-gallery-folders-bg)
  a
    display: block
    position: relative
    font-size: 1.25em
    margin-bottom: 0.33em
    color: var(--theme-gallery-folders-fg)
    &:first-of-type
      margin-bottom: 1em
    &.selected
      -webkit-text-stroke-width: 1px
      -webkit-text-stroke-color: var(--theme-gallery-folders-fg)
      &::before
        content: '►'
        position: absolute
        left: -1em
        top: 0
        bottom: 0
</style>
