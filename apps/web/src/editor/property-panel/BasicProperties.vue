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
  <div>
    <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">基础属性</h4>
    <div class="space-y-3">
      <!-- 组件信息（只读） -->
      <div>
        <label class="block text-xs text-gray-600 mb-1">组件ID</label>
        <input
          type="text"
          :value="component.id"
          disabled
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-50"
        />
      </div>
      <div>
        <label class="block text-xs text-gray-600 mb-1">组件名称</label>
        <input
          type="text"
          :value="component.label"
          disabled
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-50"
        />
      </div>

      <!-- 动态属性编辑 -->
      <div v-for="prop in propertiesList" :key="prop.key" class="space-y-1">
        <!-- 字符串类型 -->
        <template v-if="prop.type === 'string'">
          <label class="block text-xs text-gray-600">{{ prop.label }}</label>
          <input
            type="text"
            :value="component.props[prop.key] ?? prop.default"
            @input="updateProp(prop.key, ($event.target as HTMLInputElement).value)"
            class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          />
        </template>

        <!-- 数字类型 -->
        <template v-else-if="prop.type === 'number'">
          <label class="block text-xs text-gray-600">{{ prop.label }}</label>
          <input
            type="number"
            :value="component.props[prop.key] ?? prop.default"
            @input="updateProp(prop.key, Number(($event.target as HTMLInputElement).value))"
            class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          />
        </template>

        <!-- 布尔类型 -->
        <template v-else-if="prop.type === 'boolean'">
          <label class="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              :checked="component.props[prop.key] ?? prop.default"
              @change="updateProp(prop.key, ($event.target as HTMLInputElement).checked)"
              class="rounded border-gray-300"
            />
            {{ prop.label }}
          </label>
        </template>

        <!-- 选择类型 -->
        <template v-else-if="prop.type === 'select'">
          <label class="block text-xs text-gray-600">{{ prop.label }}</label>
          <select
            :value="component.props[prop.key] ?? prop.default"
            @change="updateProp(prop.key, ($event.target as HTMLSelectElement).value)"
            class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
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
