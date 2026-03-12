<script setup lang="ts">
withDefaults(defineProps<{
  src?: string
  alt?: string
  width?: string
  height?: string
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  radius?: string
}>(), {
  src: '',
  alt: '',
  width: '200px',
  height: '150px',
  fit: 'cover',
  radius: '0px',
})
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :style="{ width, height, objectFit: fit, borderRadius: radius }"
  />
</template>
