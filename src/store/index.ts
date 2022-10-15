import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {}
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

//解决ts根据vuex无法提示问题
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
