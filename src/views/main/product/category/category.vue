<template>
  <div class="category">
    <page-search :search-form-config="searchFormConfig" @query-btn-click="handleQueryClick" @reset-btn-click="handleResetClick"/>
    <page-content :content-table-config="contentTableConfig" page-name="category" ref="pageContentRef"/>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content';
import PageSearch from '@/components/page-search';
import { usePageSearch } from '@/hooks/usePageSearch';
import { contentTableConfig } from './config/content-config';
import { searchFormConfig } from './config/search-config';

const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()
</script>

<style scoped></style>
