import localCache from '@/utils/cache'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
    //根据userMenus决定children[]
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMactch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

//设置导航首位
router.beforeEach((to) => {
  if (to.path !== '/login') {
    //如果不是在登录页，都会进行获取token操作，如果没有token就跳转到登录页面
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
