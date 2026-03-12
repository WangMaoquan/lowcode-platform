<script setup lang="ts">
defineProps<{
  content?: string
  tag?: string
  fontSize?: string
  color?: string
  fontWeight?: string
  textAlign?: string
}>()
</script>

<template>
  <component
    :is="tag"
    :style="{
      fontSize,
      color,
      fontWeight,
      textAlign,
    }"
  >
    {{ content }}
  </component>
</template>
