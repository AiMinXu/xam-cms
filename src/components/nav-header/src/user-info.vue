<template>
  <div class="nav-info">
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            size="default"
            class="avatar"
            src="https://img.zcool.cn/community/01a3865ab91314a8012062e3c38ff6.png@1280w_1l_2o_100sh.png"
          >
          </el-avatar>
          <span class="name">{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item  @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              退出系统
              </el-dropdown-item>
            <el-dropdown-item divided >
              <el-icon><InfoFilled /></el-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="operation">
      <span>
        <el-icon size="50"><Bell /></el-icon>
      </span>
      <span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon size="30">
          <Postcard />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import localCache from '@/utils/cache'
import { Bell, ChatDotRound, CircleClose, InfoFilled, Postcard, Unlock } from '@element-plus/icons-vue'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const name = computed(() => store.state.login.userInfo.name)
const router = useRouter()

const handleExitClick = () => {
  localCache.delteCache('token')
  router.push('/main')
}
</script>

<style scoped lang="less">
.nav-info {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      width: 30px;
      height: 30px;
    }
    .name {
      margin-left: 8px;
    }
  }

  .operation {
    margin-right: 30px;
    font-size: 20px;
    span {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 35px;
      line-height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
}
</style>
