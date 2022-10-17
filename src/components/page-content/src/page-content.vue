<template>
  <div class="page-content">
    <div class="content">
      <hy-table :listData="usersList" v-bind="contentTableConfig">
        <!-- header插槽 -->
        <template #headerHandler>
          <el-button type="primary">新建用户</el-button>
        </template>

        <!-- 列里面的插槽 -->
        <template #status="scope">
          <el-button size="small" :type="scope.row.enable ? 'success' : 'danger'" plain>
            {{ scope.row.enable ? '启用' : '禁用' }}</el-button
          >
        </template>
        <template #create="scope">
          <span> {{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
        <template #update="scope">
          <span> {{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
        <template #handler>
          <div class="handle-btns">
            <el-button size="small" text type="primary">
              <span>
                <el-icon><EditPen /></el-icon>
                编辑
              </span>
            </el-button>
            <el-button size="small" text type="primary">
              <span>
                <el-icon><Delete /></el-icon>
                删除
              </span>
            </el-button>
          </div>
        </template>

        <!-- footer插槽 -->
      </hy-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import HyTable from '@/base-ui/table';
import { useStore } from '@/store';
import { Delete, EditPen } from '@element-plus/icons-vue';
import { computed } from 'vue';

defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  listData: {
    type: Array
  }
})

const store = useStore()
//发送请求
store.dispatch('system/getPageListDataAction', {
  pageUrl: 'users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})
const usersList = computed(() => store.state.system.usersList)
// const userTotalCount = computed(() => store.state.system.usersTotalCount)
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
