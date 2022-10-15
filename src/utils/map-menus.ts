import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [] //定义需要加载的routes

  //1.先默认加载所有的routes
  const allRoutes: RouteRecordRaw[] = [] //所有的routes
  //webpack做法
  //const routeFiles = require.context('../router/main', true, /\.ts/)//webpack中自带函数，路径，是否递归查找，正则--->返回的是一个对象
  // routeFiles.keys().forEach(Key => {
  //   console.log(Key);
  // });
  // Object.keys(routeFiles).forEach((key) => {
  //  console.log(key)
  //  const route = require('../router/main' + key.split('.')[1])
  //  allRoutes.push(route.default)
  // })

  //vite中自动加载文件处理
  const routeFiles: any = import.meta.glob('@/router/main/**/*.ts', { eager: true })
  Object.keys(routeFiles).forEach((item) => {
    const route = routeFiles[item].default
    allRoutes.push(route)
  })
  // console.log(routeFiles)
  // console.log(allRoutes)

  //根据菜单获取需要添加的routes
  //userMenus:  type === 1 -> children   type === 2 -> url  也可能为3层需要再遍历

  //封装递归函数
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        //如果type === 2即为点击需映射的url菜单
        const route = allRoutes.find((route) => route.path === menu.url) //根据route.path对应查找menu中的url
        if (route) routes.push(route) //查找到就将此url添加进routes
      } else {
        _recurseGetRoute(menu.children) //若不等于则继续递归调用
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}
