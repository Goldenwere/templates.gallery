<script setup lang='ts'>
const props = defineProps<{
  modelValue: string,
  options: {
    id: string,
    displayName: string,
  }[],
}>()

const emits = defineEmits(['update:modelValue'])

/**
 * Emits folder selection upward
 * @param event the event that called this function
 * @param option the option that was clicked
 */
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
    @keydown.enter='onSelectFolder($event, "")'
    v-html='"<i>Main Gallery</i>"'
    tabindex='0'
    :class='{ selected: modelValue === "" }'
  )
  a(
    v-for='option in options'
    tabindex='0'
    @click='onSelectFolder($event, option.id)'
    @keydown.enter='onSelectFolder($event, option.id)'
    v-html='option.displayName || option.id'
    :class='{ selected: modelValue === option.id }'
  )
</template>

<style scoped lang='sass'>
.gallery-folders
  padding-left: 2em
  background: var(--theme-gallery-folders-bg)
  color: var(--theme-gallery-folders-fg)
  a
    display: block
    position: relative
    font-size: 1.25em
    margin-bottom: 0.33em
    color: var(--theme-gallery-folders-fg)
    &:focus
      outline: 1px solid var(--theme-gallery-folders-fg)
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
