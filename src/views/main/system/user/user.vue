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
      :modalConfig="modalConfig"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import PageSearch from '@/components/page-search'
import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { contentTableConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'
import { searchFormConfig } from './config/search-config'

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch() //上面会报错，不能将Ref类型分配给函数？将函数改成any,或者在hook中使用对象返回

//pageModal相关逻辑
//回调函数
const newCallback = () => {
  const pswItem = modalConfig.formItems.find((item) => item.field === 'password')
  pswItem!.isHidden = false
}
const editCallback = () => {
  const pswItem = modalConfig.formItems.find((item) => item.field === 'password')
  pswItem!.isHidden = true
}
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
