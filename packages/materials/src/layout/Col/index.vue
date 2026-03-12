<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  span?: number
  offset?: number
  push?: number
  pull?: number
}>(), {
  span: 24,
  offset: 0,
  push: 0,
  pull: 0,
})

const flexStyle = computed(() => ({
  flex: `0 0 ${(props.span / 24) * 100}%`,
  marginLeft: `${(props.offset / 24) * 100}%`,
  position: 'relative' as const,
  right: `${props.push * 4}px`,
  left: `${-props.pull * 4}px`,
}))
</script>

<template>
  <div :style="flexStyle">
    <slot />
  </div>
</template>
