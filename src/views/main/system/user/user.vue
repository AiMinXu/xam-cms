<template>
  <div class="user">
    <div class="search">
      <hy-form v-bind="searchFormConfig" v-model='formData'/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HyForm from '@/base-ui/from';
import { ref } from 'vue';
import { searchFormConfig } from './config/search-config';

//此处是为对象，对象中多个属性需要v-modle进行双向绑定，且是取出某一个属性进行绑定
const formData = ref({//此处用reactive进行双向绑定有时候会有一定问题，所以改用 ref
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime:''
})
</script>

<style scoped></style>
