<template>
  <div class="dashboard">
    <!-- 顶部展示 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item" />
        </el-col>
      </template>
    </el-row>
    <!-- 中间展示 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hy-card>
      </el-col>
    </el-row>
    <!-- 底部展示 -->
    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import HyCard from '@/base-ui/card';
import { BarEchart, LineEchart, MapEchart, PieEchart, RoseEchart } from '@/components/page-echarts';
import StatisticalPanel from '@/components/statistical-panel';

import { useStore } from '@/store';
import { computed } from 'vue';

//发送网络请求获取数据
const store = useStore()
store.dispatch('analysis/getAnalysisDataAction')
//获取数据
const topPanelData = computed(() => store.state.analysis.topPanelDatas)
const categoryGoodsCount = computed(() => {
  return store.state.analysis.categoryGoodsCount.map((item: any) => {
    return { value: item.goodsCount, name: item.name }
  })
})
const goodsSaleTop10 = computed(() => {
  return store.state.analysis.goodsSaleTop10.map((item: any) => {
    return { value: item.select, name: item.name }
  })
})
const addressGoodsSale = computed(() => {
  return store.state.analysis.goodsAddressSale.map((item: any) => {
    return { name: item.address, value: item.count }
  })
})
const categoryGoodsSale = computed(() => {
  const goodsSale = store.state.analysis.categoryGoodsSale
  const labels: string[] = []
  const values: any[] = []
  for (const item of goodsSale) {
    labels.push(item.name)
    values.push(item.goodsCount)
  }
  return { labels, values }
})
const categoryGoodsFavor = computed(() => {
  const goodsFavor = store.state.analysis.categoryGoodsFavor
  const labels: string[] = []
  const values: any[] = []
  for (const item of goodsFavor) {
    labels.push(item.name)
    values.push(item.goodsFavor)
  }
  return { labels, values }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;

  .row {
    margin-top: 20px;
  }
}
</style>
