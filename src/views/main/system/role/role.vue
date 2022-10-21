<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      ref="pageContentRef"
      @newBtnClick="handleNewDataClick"
      @editBtnClick="handleEditClick"
    />
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <el-tree
        class="menu-tree"
        ref="elTreeRef"
        show-checkbox
        :data="entireMenus"
        node-key="id"
        :props="{ label: 'name', children: 'children' }"
        @check="handleCheckChange"
      />
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import PageSearch from '@/components/page-search'
import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { useStore } from '@/store'
import { mapMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
import { computed, nextTick, ref } from 'vue'
import { contentTableConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'
import { searchFormConfig } from './config/search-config'

const store = useStore()
// pageSearch处理hook
const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()
// ElTree的处理逻辑
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback: any = (item: any) => {
  nextTick(() => {
    const leafKeys = mapMenuLeafKeys(item.menuList)
    elTreeRef.value?.setCheckedKeys(leafKeys, true)
  })
}
// pageModal的hook
const { defaultInfo, pageModalRef, handleEditClick, handleNewDataClick } = usePageModal(
  undefined,
  editCallback
)
// pageModal的额外参数menuList
const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
const entireMenus = computed(() => store.state.entireMenus)
// console.log(entireMenus);
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
