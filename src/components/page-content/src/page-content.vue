<template>
  <div class="page-content">
    <div class="content">
      <hy-table
        :listData="pageListData"
        v-bind="contentTableConfig"
        :totalCount="totalCount"
        v-model:page="pageInfo"
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

<script setup lang="ts">
import HyTable from '@/base-ui/table';
import { useStore } from '@/store';
import { Delete, EditPen } from '@element-plus/icons-vue';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
  // totalCount: {
  //   type:Number
  // }
})

//双向绑定pageInfo，并监听获取最新数据
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData())

const store = useStore()
//发送网络请求，获取原始数据展示
const getPageData = (queryInfo: any = {}) => {
  store.dispatch('system/getPageListDataAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo //查询条件
    }
  })
}
getPageData()

//从vuex中获取页面数据
const pageListData = computed(() => store.getters['system/pageListData'](props.pageName)) //拿到的getter本身是一个函数，需要调用以获取当前页面的数据

const totalCount = computed(() => store.getters['system/pageListCount'](props.pageName)) //拿到dataCount

//导出方法
defineExpose({
  getPageData
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
