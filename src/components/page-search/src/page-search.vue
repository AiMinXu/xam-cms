<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header> </template>
      <template #footer class="footer">
        <div class="btns">
          <el-button @click="handleResetClick">
            <el-icon style="vertical-align: middle">
              <RefreshRight />
            </el-icon>
            <span style="vertical-align: middle"> 重置 </span>
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon style="vertical-align: middle">
              <Search />
            </el-icon>
            <span style="vertical-align: middle"> 查询 </span>
          </el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script setup lang="ts">
import HyForm from '@/base-ui/form';
import { RefreshRight, Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

//1.双向绑定的属性应该是由配置文件中的field决定---formData中属性应该动态决定
const formItems = props.searchFormConfig?.formItems ?? []
const fromOriginData: any = {}
for (const item of formItems) {
  //获取动态的filed属性
  fromOriginData[item.field] = '' //给默认值
}
//此处是为对象，对象中多个属性需要v-modle进行双向绑定，且是取出某一个属性进行绑定
const formData = ref({
  //此处用reactive进行双向绑定有时候会有一定问题，所以改用 ref
  ...fromOriginData
})

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])
//2.点击重置***
const handleResetClick = () => {
  //formData.value = fromOriginData//此处在使用v-modle直接修改赋值不行，改变不了值。使用:model-value进行绑定时，此处可用（详见form copy）
  for (const key in fromOriginData) {
    formData.value[`${key}`] = fromOriginData[key] //修改属性名key值，修改深层引用
  }
  emit('resetBtnClick')
}

//搜索按钮操作
const handleQueryClick = () => {
  //拿到form-item数据
  emit('queryBtnClick',formData.value)//传入payload参数
}
</script>

<style scoped>
.btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
