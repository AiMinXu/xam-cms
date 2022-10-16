<template>
  <div class="nav-header">
    <el-icon :size="30" v-if="isFold" @click="handleFoldChange"><Expand /></el-icon>
    <el-icon :size="30" v-if="!isFold" @click="handleFoldChange"><Fold /></el-icon>
    <div class="content">
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue';
import { defineEmits, ref } from 'vue';
import UserInfo from './user-info.vue';

// const props = defineProps({})
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldChange = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

// defineExpose({
//   handleFoldChange
// })
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
