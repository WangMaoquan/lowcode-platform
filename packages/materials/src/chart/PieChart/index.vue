<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  title?: string
  seriesData?: { name: string; value: number }[]
  radius?: string
  center?: string
  roseType?: string
  height?: string
}>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null

function initChart() {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  const [centerX, centerY] = (props.center || '50%, 50%').split(',').map(s => s.trim())
  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption({
    title: { text: props.title, left: 'center' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      data: props.seriesData,
      radius: props.radius,
      center: [centerX, centerY],
      roseType: props.roseType === 'none' ? undefined : props.roseType,
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
