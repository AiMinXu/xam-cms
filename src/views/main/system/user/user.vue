<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content :contentTableConfig="contentTableConfig"></page-content>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content';
import PageSearch from '@/components/page-search';
import { contentTableConfig } from './config/content-config';
import { searchFormConfig } from './config/search-config';
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
