<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    />
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { usePageSearch } from '@/hooks/usePageSearch'
import { contentTableConfig } from './config/content-config'
import { searchFormConfig } from './config/search-config'

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch() //上面会报错，不能将Ref类型分配给函数？将函数改成any,或者在hook中使用对象返回
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
