<template>
  <div class="department">
    <page-search :search-form-config="searchFormConfig" @query-btn-click="handleQueryClick" @reset-btn-click="handleResetClick"/>
    <page-content ref="pageContentRef" :content-table-config="contentTableConfig" page-name="department" @edit-btn-click="handleEditClick" @new-btn-click="handleNewDataClick"/>
    <page-modal :modal-config="modalConfigRef" ref="pageModalRef" :default-info="defaultInfo"  page-name="department"/>
  </div>
</template>

<script setup lang="ts">
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
const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()
const { pageModalRef, handleEditClick, handleNewDataClick, defaultInfo } = usePageModal()
const modalConfigRef = computed(() => {
  const parentItem = modalConfig.formItems?.find((item: any) => item.field === 'parentId')
  parentItem!.options = store.state.entireDepartments.map((item: any) => {
    return {label:item.name,value:item.id}
  })
  return modalConfig
})
</script>

<style scoped></style>
