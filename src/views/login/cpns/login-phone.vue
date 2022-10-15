<template>
  <el-form label-width="60px" :rules="phoneRules" hide-required-asterisk>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="phone.number" />
    </el-form-item>
    <el-form-item label="验证码" prop="verifyCode">
      <div class="verify-code">
        <el-input v-model="phone.verifyCode" />
        <el-button class="get-btn" type="primary">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const phone = reactive({
  number: '',
  verifyCode: ''
})
const phoneRules = {
  phone: [
    { required: true, message: '手机号是必填项', trigger: 'blur' },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '请填入正确的手机号',
      trigger: 'blur'
    } //内容正则
  ],
  verifyCode: [
    // trigger:触发情况，blur，change
    { required: true, message: '验证码是必填项', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '请填入正确的验证码', trigger: 'blur' } //内容正则
  ]
}
</script>

<style scoped lang="less">
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
