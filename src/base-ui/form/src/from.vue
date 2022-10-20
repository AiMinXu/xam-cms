<template>
  <div class="hy-from">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item v-if="!item.isHidden" :label="item.label" :rules="item.rules" :style="itemStyle">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value"
                    >{{ option.label }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, watch } from 'vue';
import { IFromItem } from '../types';

const props = defineProps({
  modelValue: {
    type: Object
  },
  formItems: {
    type: Array as PropType<IFromItem[]>, //明确数组类型
    default: () => [] //对象或者数组写成箭头函数
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 40px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      //响应式
      xl: 6, // ≥1920px
      lg: 8, // ≥1200px
      md: 12, // ≥992px
      sm: 24, // ≥768px
      xs: 24 // <768px
    })
  }
})

const emit = defineEmits(['update:modelValue']) //emit使用
const formData = ref({ ...props.modelValue }) //将原来的对象进行浅拷贝了一份放入新对象中用作初始化---类似于react中浅拷贝数据，数据不可变性（immutable）
watch(
  //监听属性
  formData,
  (newValue) => {
    emit('update:modelValue', newValue)//发送事件update:modelValue自带事件
  },
  { deep: true }//开启深度监听
)

</script>

<style scoped lang="less">
.hy-from {
  padding: 20px 20px 0;
}
</style>
