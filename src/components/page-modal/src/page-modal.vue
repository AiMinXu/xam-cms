<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="新建" width="30%" center destroy-on-close>
      <hy-from v-bind="modalConfig" v-model="formData"></hy-from>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import HyFrom from '@/base-ui/form';
import { ref, watch } from 'vue';

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  }
})
const formData = ref<any>({})
watch(
  //监听属性将，数据进行赋值到formData.value上
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

const dialogVisible = ref(false)

defineExpose({
  //需要导出
  dialogVisible
})
</script>

<style scoped></style>
