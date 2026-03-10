<script setup lang="ts">
import { computed } from 'vue'
import { useMaterials } from '@lowcode/materials'
import TreeNode from './TreeNode.vue'

const { getComponentDefinitions } = useMaterials()

const definitions = computed(() => getComponentDefinitions())
</script>

<template>
  <div class="p-4">
    <h3 class="mb-3 text-sm font-medium text-gray-900">组件库</h3>

    <!-- 基础组件 -->
    <div class="mb-4">
      <h4 class="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">基础组件</h4>
      <div class="space-y-1">
        <TreeNode
          v-for="def in definitions.filter((d) => d.category === 'basic')"
          :key="def.name"
          :definition="def"
          draggable="true"
        />
      </div>
    </div>

    <!-- 布局组件 -->
    <div class="mb-4">
      <h4 class="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">布局组件</h4>
      <div class="space-y-1">
        <TreeNode
          v-for="def in definitions.filter((d) => d.category === 'layout')"
          :key="def.name"
          :definition="def"
          draggable="true"
        />
      </div>
    </div>

    <!-- 表单组件 -->
    <div class="mb-4">
      <h4 class="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">表单组件</h4>
      <div class="space-y-1">
        <TreeNode
          v-for="def in definitions.filter((d) => d.category === 'form')"
          :key="def.name"
          :definition="def"
          draggable="true"
        />
      </div>
    </div>

    <!-- 展示组件 -->
    <div class="mb-4">
      <h4 class="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">展示组件</h4>
      <div class="space-y-1">
        <TreeNode
          v-for="def in definitions.filter((d) => d.category === 'display')"
          :key="def.name"
          :definition="def"
          draggable="true"
        />
      </div>
    </div>

    <!-- 图表组件 -->
    <div>
      <h4 class="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">图表组件</h4>
      <div class="space-y-1">
        <TreeNode
          v-for="def in definitions.filter((d) => d.category === 'chart')"
          :key="def.name"
          :definition="def"
          draggable="true"
        />
      </div>
    </div>
  </div>
</template>
