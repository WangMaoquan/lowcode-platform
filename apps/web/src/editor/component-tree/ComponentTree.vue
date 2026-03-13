<script setup lang="ts">
import { computed } from 'vue'
import { useMaterials } from '@lowcode/materials'
import TreeNode from './TreeNode.vue'

const { getComponentDefinitions } = useMaterials()

const definitions = computed(() => getComponentDefinitions())

// 组件分类和配置
const categories = [
  { key: 'basic', label: '基础组件', icon: '🔹' },
  { key: 'layout', label: '布局组件', icon: '🔲' },
  { key: 'form', label: '表单组件', icon: '📝' },
  { key: 'display', label: '展示组件', icon: '🃏' },
  { key: 'chart', label: '图表组件', icon: '📊' },
]

// 获取某个分类的组件
const getComponentsByCategory = (category: string) => {
  return definitions.value.filter((d) => d.category === category)
}
</script>

<template>
  <div class="p-3">
    <!-- 标题 -->
    <div class="flex items-center gap-2 mb-4 px-2">
      <div
        class="w-6 h-6 rounded-md flex items-center justify-center"
        style="background: linear-gradient(135deg, var(--color-dark-accent), #8b5cf6);"
      >
        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold" style="color: var(--color-dark-text); font-family: var(--font-display);">组件库</h3>
    </div>

    <!-- 组件分类列表 -->
    <div class="space-y-2">
      <div
        v-for="category in categories"
        :key="category.key"
        class="rounded-lg overflow-hidden"
        style="background-color: var(--color-dark-surface-hover);"
      >
        <!-- 分类标题 -->
        <div
          class="flex items-center gap-2 px-3 py-2.5 text-xs font-medium"
          style="color: var(--color-dark-text-secondary); font-family: var(--font-display);"
        >
          <span class="text-sm">{{ category.icon }}</span>
          <span>{{ category.label }}</span>
          <span
            class="ml-auto text-[10px] px-1.5 py-0.5 rounded"
            style="background-color: var(--color-dark-border); color: var(--color-dark-text-secondary);"
          >
            {{ getComponentsByCategory(category.key).length }}
          </span>
        </div>

        <!-- 组件列表 -->
        <div class="px-2 pb-2 space-y-1">
          <TreeNode
            v-for="def in getComponentsByCategory(category.key)"
            :key="def.name"
            :definition="def"
            draggable="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
