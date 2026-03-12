<script setup lang="ts">
const props = withDefaults(defineProps<{
  placeholder?: string
  label?: string
  disabled?: boolean
  clearable?: boolean
  multiple?: boolean
  options?: { label: string; value: string }[]
  modelValue?: string | string[]
}>(), {
  modelValue: '',
  options: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  if (props.multiple) {
    const selected = Array.from(target.selectedOptions).map(opt => opt.value)
    emit('update:modelValue', selected)
  } else {
    emit('update:modelValue', target.value)
  }
}

function handleClear() {
  emit('update:modelValue', props.multiple ? [] : '')
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="relative">
      <select
        :disabled="disabled"
        :multiple="multiple"
        :value="modelValue as any"
        @change="handleChange"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
      >
        <option v-if="!multiple && placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <button
        v-if="clearable && !multiple && modelValue"
        type="button"
        @click="handleClear"
        class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  </div>
</template>
