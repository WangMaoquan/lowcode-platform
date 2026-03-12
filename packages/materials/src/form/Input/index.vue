<script setup lang="ts">
const props = withDefaults(defineProps<{
  placeholder?: string
  label?: string
  disabled?: boolean
  clearable?: boolean
  password?: boolean
  maxlength?: number
  modelValue?: string
}>(), {
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleClear() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="relative">
      <input
        :type="password ? 'password' : 'text'"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :value="modelValue"
        @input="handleInput"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 pr-8"
      />
      <button
        v-if="clearable && modelValue"
        type="button"
        @click="handleClear"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  </div>
</template>
