import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import ElementPlus from 'element-plus'
import registerApp from './global'
import hyRequest from './services'
import store from './stores'
const app = createApp(App)

// app.use(ElementPlus)//全局引用
// app.use(createPinia())
// registerApp(app)
app.use(registerApp) //使用app.use方式注册组件
app.use(router)
app.use(store)
app.mount('#app')

interface D {
  data: any
  returnCode: string
  success: boolean
}

hyRequest
  .get<D>({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
