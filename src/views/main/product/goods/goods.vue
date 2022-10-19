<template>
  <div class="goods">
    <!-- <page-search :searchConfig="searchFormConfig"/> -->
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #imageSlot="scope">
        <!-- 记得添加属性preview-teleported使其挂载到body上，不然影响样式 -->
        <el-image style="width: 60px; height: 60px" :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]" preview-teleported/>
      </template>
      <!-- 也可以这样使用，动态修改决定插入内容，只需要配置文件中加上slotName后进行配置
      <template #oldPrice="scope">
        {{'¥' + scope.row.oldPrice}}
      </template> -->
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content';
// import PageSearch from '@/components/page-search';

import { contentTableConfig } from './config/content-config';
// import { searchFormConfig } from './config/search-config'
</script>

<style scoped></style>
