<template>
  <div class="hy-from">
    <el-form :label-width="labelWidth">
      <el-row>
      <template v-for="item in formItems" :key="item.label" >
        <el-col v-bind="colLayout" >
          <el-form-item :label="item.label" :rules="item.rules" :style="itemStyle">
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input :placeholder="item.placeholder" :show-password="item.type === 'password'" v-bind='item.otherOptions'/>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select :placeholder="item.placeholder" v-bind='item.otherOptions' style="width: 100%">
                <el-option v-for="option in item.options" :value="option.value" :key="option.value" >{{option.label}}</el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker v-bind="item.otherOptions" style="width: 100%"></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { IFromItem } from '../types';
defineProps({
  formItems: {
    type: Array as PropType<IFromItem[]>,//明确数组类型
    default: () => []//对象或者数组写成箭头函数
  },
  labelWidth: {
    type: String,
    default:'100px'
  },
  itemStyle: {
    type: Object,
    default:()=>({ padding: '10px 40px' })
  },
  colLayout: {
    type: Object,
      default: () => ({//响应式
        xl: 6, // ≥1920px
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24 // <768px
      })
  }
})
</script>

<style scoped lang="less">
.hy-from {
  padding: 20px 20px 0;
}
</style>
