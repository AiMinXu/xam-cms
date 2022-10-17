<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search';
import { searchFormConfig } from './config/search-config';
</script>

<style scoped lang="less">

</style>
