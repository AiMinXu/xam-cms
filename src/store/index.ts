import { getPageList } from '@/services/main/system/system'
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'xam',
      entireRoles: [], //全部角色
      entireDepartments: [], //全部部门
      entireMenus: []
    }
  },
  mutations: {
    changeEntireRoles(state, entireRoles) {
      state.entireRoles = entireRoles
    },
    changeEntireDepartments(state, entireDepartments) {
      state.entireDepartments = entireDepartments
    },
    changeEntireMenus(state, entireMenus) {
      state.entireMenus = entireMenus
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      //1.请求部门和角色数据
      const departmentRes = await getPageList('/department/list', { offset: 0, size: 10000 })
      const { list: entireDepartments } = departmentRes.data
      const roleRes = await getPageList('/role/list', { offset: 0, size: 10000 })
      const { list: entireRoles } = roleRes.data
      const menuRes = await getPageList('/menu/list', {})
      const { list: entireMenus } = menuRes.data
      //2.保存数据
      commit('changeEntireRoles', entireRoles)
      commit('changeEntireDepartments', entireDepartments)
      commit('changeEntireMenus', entireMenus)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  //store.dispatch('getInitialDataAction') //初始化调用---不要在这里调用因为请求是异步的可能token还没拿到
}

//解决ts根据vuex无法提示问题
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
