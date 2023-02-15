<template lang='pug'>
#entry
  main
    router-view
</template>

<style lang='sass' scoped>
#entry
  width: 100vw
  height: 100vh
  overflow: hidden
  position: relative
</style>

<script lang='ts'>
import {
  defineComponent,
} from 'vue'

export default defineComponent({})
</script>
