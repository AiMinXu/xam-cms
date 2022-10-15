<template>
  <el-form :model="account" label-width="60px" ref="formRef" :rules="accountRules" hide-required-asterisk>
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import localCache from '@/utils/cache';
import { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { accountRules } from '../config/account-config';

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
const formRef = ref<InstanceType<typeof ElForm>>()//拿到类型

const store = useStore()

  //登录操作
const loginAction = (isKeep:boolean) => {
  formRef.value?.validate((valid)=> {
    if (valid) {
      //是否记住密码
      if (isKeep) {
        //本地缓存---使用localstorage
        localCache.setCache('name',account.name)
        localCache.setCache('password',account.password)
      } else {
        localCache.delteCache('name')
        localCache.delteCache('password')
      }
      //开始进行登录验证
      store.dispatch('login/accountLoginAction',{...account})

    }

  })
}

// 重点！！这里需要使用defineExpose暴露出去
defineExpose({
	loginAction
})
</script>

<style scoped lang="less"></style>
