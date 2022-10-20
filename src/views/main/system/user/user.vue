<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewDataClick"
      @editBtnClick="handleEditClick"
    />
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { IFormItem } from '@/base-ui/form/types'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import PageSearch from '@/components/page-search'
import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { useStore } from '@/store'
import { computed } from 'vue'
import { contentTableConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'
import { searchFormConfig } from './config/search-config'

const store = useStore()
const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch() //上面会报错，不能将Ref类型分配给函数？将函数改成any,或者在hook中使用对象返回

//pageModal相关逻辑
//1.处理密码的逻辑
const newCallback = () => {
  const pswItem = modalConfig.formItems.find((item) => item.field === 'password')
  pswItem!.isHidden = false
}
const editCallback = () => {
  if (modalConfig) {

    const pswItem = modalConfig.formItems.find((item) => item.field === 'password')
    pswItem!.isHidden = true
  }
}
//2.动态添加部门/角色列表数据
const modalConfigRef = computed(() => {
  //使用computed动态计算变成响应式的数据--其返回值也是一个ref对象
  const roleOption: IFormItem | undefined = modalConfig.formItems?.find(
    (item) => item.field === 'roleId'
  )
  roleOption!.options = store.state.entireRoles.map((item: any) => {
    return { label: item.name, value: item.id }
  })
  const departmentOption: IFormItem | undefined = modalConfig.formItems?.find(
    (item) => item.field === 'departmentId'
  )
  departmentOption!.options = store.state.entireDepartments.map((item: any) => {
    return { label: item.name, value: item.id }
  })
  return modalConfig
})
const { defaultInfo, pageModalRef, handleNewDataClick, handleEditClick } = usePageModal(
  newCallback,
  editCallback
)
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
