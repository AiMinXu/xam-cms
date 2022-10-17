<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级</h1>
      </template>
      <template #footer class="footer">
        <div class="btns">
          <el-button>
            <el-icon style="vertical-align: middle">
              <RefreshRight />
            </el-icon>
            <span style="vertical-align: middle"> 重置 </span>
          </el-button>
          <el-button type="primary">
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

defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})
//此处是为对象，对象中多个属性需要v-modle进行双向绑定，且是取出某一个属性进行绑定
const formData = ref({
  //此处用reactive进行双向绑定有时候会有一定问题，所以改用 ref
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})
</script>

<style scoped>
.btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
