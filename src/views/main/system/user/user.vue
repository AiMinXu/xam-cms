<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig" />
    </div>
    <div class="content">
      <hy-table
        :listData="usersList"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
        :title="title"
      >
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

<script lang="ts" setup>
import HyTable from '@/base-ui/table'
import PageSearch from '@/components/page-search'
import { useStore } from '@/store'
import { Delete, EditPen } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { searchFormConfig } from './config/search-config'

const store = useStore()
//发送请求
store.dispatch('system/getPageListDataAction', {
  pageUrl: 'users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})
const title = '用户列表'
const usersList = computed(() => store.state.system.usersList)
const userTotalCount = computed(() => store.state.system.usersTotalCount)
const propList = [
  { prop: 'name', label: '用户名', minWidth: '100' },
  { prop: 'realname', label: '真实名', minWidth: '120' },
  { prop: 'cellphone', label: '手机号码', minWidth: '150' },
  { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
  { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'create' },
  { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'update' },
  { label: '操作', minWidth: '120', slotName: 'handler' }
]
const showIndexColumn = true
const showSelectColumn = true
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
