<template>
  <div id="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'; //elm-plus国际化设置

</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
