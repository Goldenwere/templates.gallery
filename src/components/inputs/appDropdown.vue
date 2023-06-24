<script setup lang='ts'>
const props = defineProps<{
  id: string,
  label: string,
  options: {
    id: string,
    displayName: string,
  }[],
  modelValue: string,
}>()

const emits = defineEmits(['update:modelValue'])
</script>

<template lang='pug'>
.input-container.dropdown
  label(
    :for='id'
  ) {{ label }}
  select.input(
    :name='id'
    :id='id'
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  )
    option(
      v-for='option in options'
      :value='option.id'
    ) {{ option.displayName }}
</template>

<style scoped lang='sass'>
.dropdown
  display: flex
  align-items: center
  gap: 0.5em
  background-color: white
  color: black
  padding: 0.5em
</style>
