<template>
  <div class="nav-header">
    <el-icon :size="30" v-if="isFold" @click="handleFoldChange"><Expand /></el-icon>
    <el-icon :size="30" v-if="!isFold" @click="handleFoldChange"><Fold /></el-icon>
    <div class="content">
      <breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import breadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { Expand, Fold } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import UserInfo from './user-info.vue'

// const props = defineProps({})
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
//面包屑数据[{name:xxx,path:xxx}]
const breadcrumbs = computed(() => {
  const path = useRoute().path
  const userMenus = useStore().state.login.userMenus
  return pathMapBreadcrumbs(userMenus, path)
})


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
