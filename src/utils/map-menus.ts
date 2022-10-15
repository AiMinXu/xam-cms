import { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.先默认加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  //const routeFiles = require.context('../router/main', true, /\.ts/)//webpack中自带函数，路径，是否递归查找，正则--->返回的是一个对象
  // routeFiles.keys().forEach(Key => {
  //   console.log(Key);
  // });
  const routeFiles: any = import.meta.glob('@/router/main/**/*.ts', { eager: true }) //vite中
  console.log(routeFiles)
  // for (const path in routeFiles) {
  //   // console.log(path)
  // }
  // Object.keys(routeFiles).forEach((key) => {
  //   // console.log(key)
  //   Object.keys(routeFiles[key]).forEach((key: any) => {
  //     allRoutes.push(...routeFiles[item][key]);
  //   })
  // })

  Object.keys(routeFiles).forEach((item) => {
    const route = routeFiles[item].default
    allRoutes.push(route)
  })
  console.log(allRoutes)

  //根据菜单获取需要添加的routes

  return routes
}
// mapMenusToRoutes()
