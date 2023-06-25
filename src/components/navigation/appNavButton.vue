<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits<{
  (e: 'stateChanged', state?: boolean): void
}>()

const router = useRouter()
router.afterEach((to, from) => {
  isOpen.value = false
  emit('stateChanged', isOpen.value)
})

const isOpen = ref(false)

/**
 * Handler for when the button is pressed
 * @param event the event object that called this function
 */
function onClick(event: Event) {
  event.preventDefault()
  isOpen.value = !isOpen.value
  emit('stateChanged', isOpen.value)
}
</script>

<template lang='pug'>
.nav-button(
  :class='{ "is-open": isOpen }'
  @click='onClick($event)'
  @keydown.enter='onClick($event)'
  tabindex=0
  aria-label='menu button'
)
  .icon
    .bar.bar1
    .bar.bar2
    .bar.bar3
  p Menu
</template>

<style scoped lang='sass'>
.nav-button
  display: flex
  flex-direction: column
  color: var(--theme-nav-fg)
  text-align: center
  cursor: pointer
  background: var(--theme-nav-bg)
  padding: 0.5em
  position: relative
  height: 4.5em
  .icon
    width: 3em
    height: 2.5em
    position: relative
    .bar
      background: var(--theme-nav-fg)
      position: absolute
      width: 3em
      height: 0.5em
      transition-duration: 0.5s
      transition-property: top, transform
      transition-timing-function: var(--theme-transition-function)
    .bar1
      top: 0
    .bar2
      top: 1em
    .bar3
      top: 2em
  p
    font-size: 0.75em
    line-height: 0.75em
    margin: 0.75em 0 0
  &.is-open
    .icon
      .bar1
        transform: rotate(225deg)
        top: 1em
      .bar2
        transform: scale(0)
      .bar3
        transform: rotate(-225deg)
        top: 1em
</style>
