import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

// 注册中国地图
import chinaJson from '../data/china.json'
echarts.registerMap('china', chinaJson as any)

export function useEcharts(domEl: HTMLElement, theme?: 'light') {
  //初始化echarts
  const echartsInstance = echarts.init(domEl, theme, { renderer: 'svg' })
  //配置options
  const setOptions = (options: EChartsOption) => {
    echartsInstance.setOption(options)
  }
  //主动重新设置尺寸函数
  const setResize = () => {
    echartsInstance.resize()
  }
  //监听windo尺寸变化
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })

  return { setOptions, echartsInstance, setResize }
}
