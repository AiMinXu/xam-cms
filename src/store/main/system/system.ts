import { getPageList } from '@/services/main/system/system'
import { Module } from 'vuex'
import { IRootState } from '../../types'
import { ISystemState } from './types'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersTotalCount: 0,
      usersList: [],
      departmentTotalCount: 0,
      departmentList: [],
      roleTotalCount: 0,
      roleList: [],
      menuList: [],
      categoryTotalCount: 0,
      categoryList: [],
      goodsTotalCount: 0,
      goodsList: [],
      storyTotalCount: 0,
      storyList: []
    }
  },
  mutations: {
    changeUserList(state, userList: any) {
      state.usersList = userList
    },
    changeUserCount(state, usersTotalCount: any) {
      state.usersTotalCount = usersTotalCount
    }
  },
  getters: {},
  actions: {
    async getPageListDataAction({ commit }, payload: any) {
      const pageUrl = payload.pageUrl
      const queryInfo = payload.queryInfo
      //发送请求
      const pageRes = await getPageList(pageUrl, queryInfo)
      const { list, totalCount } = pageRes.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
