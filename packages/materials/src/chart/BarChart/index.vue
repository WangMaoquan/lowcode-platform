<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  title?: string
  xAxisData?: string[]
  seriesData?: number[]
  seriesName?: string
  horizontal?: boolean
  stacked?: boolean
  height?: string
}>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null

function initChart() {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption({
    title: { text: props.title },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: props.horizontal ? 'value' : 'category',
      data: props.horizontal ? undefined : props.xAxisData,
    },
    yAxis: {
      type: props.horizontal ? 'category' : 'value',
      data: props.horizontal ? props.xAxisData : undefined,
    },
    series: [{
      name: props.seriesName,
      type: 'bar',
      data: props.seriesData,
      stack: props.stacked ? 'total' : undefined,
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
