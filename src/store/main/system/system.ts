import { deletePageData, getPageList } from '@/services/main/system/system'
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
    changeUsersTotalCount(state, totalCount: number) {
      state.usersTotalCount = totalCount
    },
    changeUsersList(state, usersList: any) {
      state.usersList = usersList
    },
    changeDepartmentTotalCount(state, totalCount: number) {
      state.departmentTotalCount = totalCount
    },
    changeDepartmentList(state, departmentList: any) {
      state.departmentList = departmentList
    },
    changeRoleTotalCount(state, totalCount: number) {
      state.roleTotalCount = totalCount
    },
    changeRoleList(state, roleList: any) {
      state.roleList = roleList
    },
    changeMenuList(state, menuList: any) {
      state.menuList = menuList
    },
    changeCategoryTotalCount(state, totalCount: number) {
      state.categoryTotalCount = totalCount
    },
    changeCategoryList(state, roleList: any) {
      state.categoryList = roleList
    },
    changeGoodsTotalCount(state, totalCount: number) {
      state.goodsTotalCount = totalCount
    },
    changeGoodsList(state, roleList: any) {
      state.goodsList = roleList
    },
    changeStoryTotalCount(state, totalCount: number) {
      state.storyTotalCount = totalCount
    },
    changeStoryList(state, storyList: any) {
      state.storyList = storyList
    }
  },
  getters: {
    pageListData(state) {
      //动态获取不同页面的数据
      return (pageName: string) => {
        const ListData: any[] = (state as any)[`${pageName}List`] ?? []
        return ListData
      }
    },
    pageListCount(state) {
      //动态获取不同页面的总数据个数
      return (pageName: string) => {
        return (state as any)[`${pageName}TotalCount`]
      }
    }
  },
  actions: {
    //获取页面数据操作
    async getPageListDataAction({ commit, dispatch }, payload: any) {
      //获取Url
      const pageName = payload.pageName

      const pageUrl = `/${pageName}/list` //优化：可以直接拼接
      // if (pageName.length === 0) return
      // let pageUrl = '' //为了使封装更具有通用性
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      //   default:
      //     break
      // }
      const queryInfo = payload.queryInfo
      //发送请求
      const pageRes = await getPageList(pageUrl, queryInfo)

      //处理请求数据，存储到state中
      const { list, totalCount } = pageRes.data
      //方法一
      // const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)//数据处理
      // commit(`change${changePageName}List`,list)
      // commit(`change${changePageName}totalCount`,totalCount)
      //方法二
      switch (pageName) {
        case 'users':
          commit('changeUsersTotalCount', totalCount)
          commit('changeUsersList', list)
          break
        case 'department':
          commit('changeDepartmentTotalCount', totalCount)
          commit('changeDepartmentList', list)
          break
        case 'role':
          commit('changeRoleTotalCount', totalCount)
          commit('changeRoleList', list)
          break
        case 'menu':
          commit('changeMenuList', list)
          break
        case 'category':
          commit('changeCategoryTotalCount', totalCount)
          commit('changeCategoryList', list)
          break
        case 'goods':
          commit('changeGoodsTotalCount', totalCount)
          commit('changeGoodsList', list)
          break
        case 'story':
          commit('changeStoryTotalCount', totalCount)
          commit('changeStoryList', list)
          break
      }
    },
    //删除操作
    async deletePageDataAction(context, payload: any) {
      //1.pageName-> /users/用于拼接，2.id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      //发送网络请求
      await deletePageData(pageUrl)
      //请求最新数据
      context.dispatch('getPageListDataAction', { pageName, queryInfo: { offset: 0, size: 10 } })
    }
  }
}

export default systemModule
