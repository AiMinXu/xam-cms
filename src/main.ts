import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import 'normalize.css'
import App from './App.vue'
import './assets/css/index.css'
import globalRegister from './global'
import router from './router'
import store, { setupStore } from './store'

const app = createApp(App)

//定义声明$filter类型，volar插件的锅
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}
// app.use(ElementPlus)//全局引用
// app.use(createPinia())
// registerApp(app)
app.use(globalRegister) //使用app.use方式注册组件
app.use(store)
setupStore() //先回调后匹配动态路由
app.use(router)

app.mount('#app')
