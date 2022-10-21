<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { EChartsOption } from 'echarts';
import { onMounted, ref, watchEffect, withDefaults } from 'vue';
import { useEcharts } from '../hooks/useEcharts';
//定义props
const props = withDefaults(
  defineProps<{//在泛型里面传props
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: '100%',//给默认值
    height: '360px',
    options: ()=>({})
  }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  // const echartsInstance = echarts.init(echartDivRef.value!)
  // echartsInstance.setOption(props.options)
  const { setOptions } = useEcharts(echartDivRef.value!)//直接调用hook进行设置
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="less"></style>
