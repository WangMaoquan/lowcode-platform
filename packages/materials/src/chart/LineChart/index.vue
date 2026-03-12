<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  title?: string
  xAxisData?: string[]
  seriesData?: number[]
  seriesName?: string
  smooth?: boolean
  areaStyle?: boolean
  height?: string
}>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null

function initChart() {
  if (!chartRef.value) return

  // 如果已存在实例，先销毁
  if (chartInstance) {
    chartInstance.dispose()
  }

  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption({
    title: { text: props.title },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: props.xAxisData },
    yAxis: { type: 'value' },
    series: [{
      name: props.seriesName,
      type: 'line',
      data: props.seriesData,
      smooth: props.smooth,
      areaStyle: props.areaStyle ? {} : undefined,
    }],
  })
}

onMounted(initChart)
onUnmounted(() => {
  chartInstance?.dispose()
  chartInstance = null
})
watch(() => props, initChart, { deep: true })
</script>

<template>
  <div ref="chartRef" :style="{ height }" />
</template>
