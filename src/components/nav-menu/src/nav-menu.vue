<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+Vite+TS</span>
    </div>

    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :unique-opened="false"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.id">
          <!-- 二级菜单可展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <!-- <item.icon.split('-').slice(2).map(item => item.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())).join('') /> -->
                <Setting />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单（若有） -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
          </el-menu-item>
          <span>{{ item.name }}</span>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { pathMapToMenu } from '@/utils/map-menus';
import { Setting } from '@element-plus/icons-vue';
import { computed, defineProps, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
const store = useStore()
const router = useRouter()
const route = useRoute()
const { collapse } = toRefs(props) //取出数据变成响应式
const userMenus = computed(() => store.state.login.userMenus)
const currentPath = route.path
const menu = pathMapToMenu(userMenus.value,currentPath)//computed取到的是ref对象需要点value取值
const defaultValue = ref(menu.id + '')

const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? 'not-found'
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
