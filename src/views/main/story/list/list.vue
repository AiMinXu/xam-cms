<template>
  <div class="list">
    <PageContent :content-table-config="contentTableConfig" page-name="story" />
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/src/page-content.vue';
import { contentTableConfig } from './config/content-config';
</script>

<style scoped></style>
