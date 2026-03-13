<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useMaterials } from '@lowcode/materials'
import type { ComponentInstance } from '@lowcode/shared/types'

const props = defineProps<{
  component: ComponentInstance
}>()

const editorStore = useEditorStore()
const { getComponentPropsSchema } = useMaterials()

// 获取当前组件的 propsSchema
const propsSchema = computed(() => {
  return getComponentPropsSchema(props.component.name)
})

// 转换为数组以便遍历
const propertiesList = computed(() => {
  return Object.entries(propsSchema.value).map(([key, schema]) => ({
    key,
    ...schema
  }))
})

// 处理属性变化
function updateProp(key: string, value: any) {
  editorStore.updateComponent(props.component.id, {
    props: {
      ...props.component.props,
      [key]: value
    }
  })
}
</script>

<template>
  <div class="rounded-lg overflow-hidden" style="background-color: var(--color-dark-surface-hover);">
    <!-- 区块标题 -->
    <div class="px-3 py-2.5 flex items-center gap-2" style="border-bottom: 1px solid var(--color-dark-border);">
      <div
        class="w-5 h-5 rounded flex items-center justify-center"
        style="background-color: var(--color-dark-accent);"
      >
        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <h4 class="text-xs font-semibold" style="color: var(--color-dark-text); font-family: var(--font-display);">基础属性</h4>
    </div>

    <div class="p-3 space-y-3">
      <!-- 组件信息（只读） -->
      <div>
        <label class="block text-xs mb-1.5" style="color: var(--color-dark-text-secondary);">组件ID</label>
        <input
          type="text"
          :value="component.id"
          disabled
          class="w-full px-2.5 py-2 text-xs rounded-lg border transition-colors"
          style="
            background-color: var(--color-dark-surface);
            border-color: var(--color-dark-border);
            color: var(--color-dark-text-secondary);
          "
        />
      </div>
      <div>
        <label class="block text-xs mb-1.5" style="color: var(--color-dark-text-secondary);">组件名称</label>
        <input
          type="text"
          :value="component.label"
          disabled
          class="w-full px-2.5 py-2 text-xs rounded-lg border transition-colors"
          style="
            background-color: var(--color-dark-surface);
            border-color: var(--color-dark-border);
            color: var(--color-dark-text-secondary);
          "
        />
      </div>

      <!-- 动态属性编辑 -->
      <div v-for="prop in propertiesList" :key="prop.key" class="space-y-1.5">
        <!-- 字符串类型 -->
        <template v-if="prop.type === 'string'">
          <label class="block text-xs" style="color: var(--color-dark-text-secondary);">{{ prop.label }}</label>
          <input
            type="text"
            :value="component.props[prop.key] ?? prop.default"
            @input="updateProp(prop.key, ($event.target as HTMLInputElement).value)"
            class="w-full px-2.5 py-2 text-xs rounded-lg border transition-all"
            style="
              background-color: var(--color-dark-surface);
              border-color: var(--color-dark-border);
              color: var(--color-dark-text);
            "
          />
        </template>

        <!-- 数字类型 -->
        <template v-else-if="prop.type === 'number'">
          <label class="block text-xs" style="color: var(--color-dark-text-secondary);">{{ prop.label }}</label>
          <input
            type="number"
            :value="component.props[prop.key] ?? prop.default"
            @input="updateProp(prop.key, Number(($event.target as HTMLInputElement).value))"
            class="w-full px-2.5 py-2 text-xs rounded-lg border transition-all"
            style="
              background-color: var(--color-dark-surface);
              border-color: var(--color-dark-border);
              color: var(--color-dark-text);
            "
          />
        </template>

        <!-- 布尔类型 -->
        <template v-else-if="prop.type === 'boolean'">
          <label class="flex items-center gap-2 text-xs cursor-pointer" style="color: var(--color-dark-text-secondary);">
            <input
              type="checkbox"
              :checked="component.props[prop.key] ?? prop.default"
              @change="updateProp(prop.key, ($event.target as HTMLInputElement).checked)"
              class="rounded"
              style="accent-color: var(--color-dark-accent);"
            />
            {{ prop.label }}
          </label>
        </template>

        <!-- 选择类型 -->
        <template v-else-if="prop.type === 'select'">
          <label class="block text-xs" style="color: var(--color-dark-text-secondary);">{{ prop.label }}</label>
          <select
            :value="component.props[prop.key] ?? prop.default"
            @change="updateProp(prop.key, ($event.target as HTMLSelectElement).value)"
            class="w-full px-2.5 py-2 text-xs rounded-lg border transition-all"
            style="
              background-color: var(--color-dark-surface);
              border-color: var(--color-dark-border);
              color: var(--color-dark-text);
            "
          >
            <option v-for="option in prop.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </template>
      </div>
    </div>
  </div>
</template>
