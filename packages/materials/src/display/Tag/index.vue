<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
  type?: string
  effect?: string
  closable?: boolean
  round?: boolean
}>(), {
  text: '标签',
  type: 'primary',
  effect: 'light',
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const typeColors: Record<string, string> = {
  primary: 'bg-indigo-100 text-indigo-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
}

const effectColors: Record<string, string> = {
  light: '',
  dark: 'bg-gray-800 text-white',
  plain: 'bg-white border border-gray-300 text-gray-700',
}

function getClass() {
  const classes: string[] = []
  if (effect.value === 'plain') {
    classes.push(effectColors.plain)
  } else if (effect.value === 'dark') {
    classes.push(effectColors.dark)
  } else {
    // light 效果使用 typeColors
    classes.push(typeColors[type.value || 'primary'])
  }
  if (round.value) {
    classes.push('rounded-full')
  } else {
    classes.push('rounded')
  }
  return classes
}
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium"
    :class="getClass()"
  >
    {{ text }}
    <button
      v-if="closable"
      type="button"
      @click="emit('close')"
      class="ml-1 hover:text-red-500"
    >
      ×
    </button>
  </span>
</template>
