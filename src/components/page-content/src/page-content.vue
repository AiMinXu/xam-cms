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
          <el-button v-if="isCreate" type="primary" @click="handleNewClick">{{
            contentTableConfig.newBtnTitle ?? '新建数据'
          }}</el-button>
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
        <template #handler="scope">
          <div class="handle-btns">
            <el-button
              size="small"
              type="primary"
              v-if="isUpdate"
              @click="handleEditClick(scope.row)"
            >
              <span>
                <el-icon><EditPen /></el-icon>
                编辑
              </span>
            </el-button>
            <el-button
              size="small"
              type="danger"
              v-if="isDelete"
              @click="handleDeleteClick(scope.row)"
            >
              <span>
                <el-icon><Delete /></el-icon>
                删除
              </span>
            </el-button>
          </div>
        </template>

        <!-- 动态插槽 -->
        <template v-for="item in otherPropSlots" :key="item.prop" #item.slotName="scope">
          <template v-if="item.slotName">
            <slot :name="item.slotName" :row="scope.row"></slot>
          </template>
        </template>
        <!-- footer插槽 -->
      </hy-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import HyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/usePermission'
import { useStore } from '@/store'
import { Delete, EditPen } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['newBtnClick', 'editBtnClick'])
//0.获取页面操作的权限
const isCreate = usePermission(props.pageName, 'create') //创建权限
const isUpdate = usePermission(props.pageName, 'create') //更新编辑权限
const isDelete = usePermission(props.pageName, 'delete') //删除权限
const isQuery = usePermission(props.pageName, 'query') //请求数据权限

//1.双向绑定pageInfo，并监听获取最新数据
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData())

//发2.送网络请求，获取原始数据展示
const store = useStore()
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return //有无权限
  store.dispatch('system/getPageListDataAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo //查询条件
    }
  })
}
getPageData()

//3.从vuex中获取页面数据---使用store有作用域，需要加‘system/’
const pageListData = computed(() => store.getters['system/pageListData'](props.pageName)) //拿到的getter本身是一个函数，需要调用以获取当前页面的数据

const totalCount = computed(() => store.getters['system/pageListCount'](props.pageName)) //拿到dataCount

//4.获取其他的动态插槽
// const otherPropSlots = computed(() => {
//   props.contentTableConfig.propList.filter((item:any) => {
//     if (item.slotName === 'status') return false
//     else if (item.slotName === 'create') return false
//     else if (item.slotName === 'update') return false
//     else if (item.slotName === 'handler') return false
//     return true
//   })
// })
const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
  if (item.slotName === 'status') return false
  else if (item.slotName === 'create') return false
  else if (item.slotName === 'update') return false
  else if (item.slotName === 'handler') return false
  return true
})

//按钮操作
const handleDeleteClick = (item: any) => {
  store.dispatch('system/deletePageDataAction', { pageName: props.pageName, id: item.id })
}
const handleNewClick = () => {
  emit('newBtnClick')
}
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}
//导出方法
defineExpose({
  getPageData,
  isCreate,
  isUpdate,
  isDelete
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .handle-btns {
    display: flex;
    justify-content: center;
  }
}
</style>
