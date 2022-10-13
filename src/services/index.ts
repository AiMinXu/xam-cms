//service统一出口
import { API_BASE_URL, TIME_OUT } from './request/config'
import HYRequest from './request/request'

//创建一个实例
const hyRequest = new HYRequest({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      console.log('请求成功拦截')
      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    responseInterceptor(config) {
      console.log('响应成功拦截')
      return config
    },
    responseInterceptorCatch(error) {
      return error
    }
  }
})

export default hyRequest
