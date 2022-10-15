<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="icon"><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="icon"><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"/>
      </el-tab-pane>
    </el-tabs>

    <div class="control-account">
      <el-checkbox v-model="isKeep">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { Iphone, User } from '@element-plus/icons-vue';
import { ref } from 'vue';
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';
//定义属性
const isKeep = ref(true)
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()
const currentTab = ref<string>('account')//确定所选的哪个tab，并给到默认值
//定义方法
const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeep.value)//使用可选链

  } else {
    console.log('phoneRef.value?.loginAction调用');

  }
}


</script>

<style scoped lang="less">
.login-panel {
  width: 350px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }
  .custom-tabs-label {
    text-align: center;
    .icon {
      margin-right: 5px;
      padding-top: 5px;
    }
  }
  .control-account {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
