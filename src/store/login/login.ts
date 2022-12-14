import router from '@/router'
import {
  accountLoginRequest,
  userInfoByIdRequest,
  userMenusByRoleIdRequest
} from '@/services/login/login'
import localCache from '@/utils/cache'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import { Module } from 'vuex'

import { IAccount } from '@/services/login/types'
import { IRootState } from '../types'
import { ILoginState } from './types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true, //给命名空间
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      //userMenus映射到routes
      const routes = mapMenusToRoutes(userMenus)
      //将routes=>router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route) //动态添加路由,参数name（'main'）对应的名称，会将路由动态的添加到该路由下，形成子路由
      })
      ///获取并保存用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    //登录验证逻辑
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.实现登录逻辑
      const loginResult: any = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token) //提交mutation,并携带参数
      localCache.setCache('token', token) //token本地缓存

      //发送初始化请求（完整的role/department/menu）
      dispatch('getInitialDataAction', null, { root: true }) //调用根的action

      //2.请求用户信息
      const userInfoRes = await userInfoByIdRequest(id)
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //3.根据用户角色请求用户菜单
      const userMenuRes = await userMenusByRoleIdRequest(userInfo.role.id)
      const userMenus = userMenuRes.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //跳转首页
      router.push('/main')
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('phoneLoginAction', payload)
    },
    //每次刷新页面时都会调用该方法，保证存储中有相应数据，且保证vuex中有相应数据
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //发送初始化请求（完整的role/department/menu）
        dispatch('getInitialDataAction', null, { root: true }) //调用根的action
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
