<template>
  <div class="menu1">
    <page-content :content-table-config="contentTableConfig" page-name="menu"></page-content>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content/src/page-content.vue';
import { contentTableConfig } from './config/conten-config';
</script>

<style scoped></style>
