import { useStore } from '@/store'

//pageName: 当前页面, handleName: 处理的页面
export function usePermission(pageName: string, handleName: string) {
  //获取permissions
  const store = useStore()
  const permissions = store.state.login.permissions
  //查找是否具有页面对应权限
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermission) //!!取反
}
