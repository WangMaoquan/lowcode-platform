<script setup lang="ts">
withDefaults(defineProps<{
  columns?: { label: string; dataIndex: string }[]
  data?: Record<string, any>[]
  stripe?: boolean
  border?: boolean
  hover?: boolean
}>(), {
  columns: () => [],
  data: () => [],
})
</script>

<template>
  <table class="w-full">
    <thead>
      <tr :class="border ? 'border-b border-gray-200' : ''">
        <th
          v-for="col in columns"
          :key="col.dataIndex"
          class="px-4 py-2 text-left text-sm font-medium text-gray-700"
          :class="border ? 'border-r border-gray-200' : ''"
        >
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, idx) in data"
        :key="idx"
        :class="[
          stripe && idx % 2 === 1 ? 'bg-gray-50' : '',
          hover ? 'hover:bg-gray-100' : '',
          border ? 'border-b border-gray-200' : '',
        ]"
      >
        <td
          v-for="col in columns"
          :key="col.dataIndex"
          class="px-4 py-2 text-sm text-gray-600"
          :class="border ? 'border-r border-gray-200' : ''"
        >
          {{ row[col.dataIndex] }}
        </td>
      </tr>
      <tr v-if="!data || data.length === 0">
        <td
          :colspan="columns.length"
          class="py-8 text-center text-gray-400"
        >
          暂无数据
        </td>
      </tr>
    </tbody>
  </table>
</template>
