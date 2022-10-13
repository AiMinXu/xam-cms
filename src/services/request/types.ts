import type { AxiosRequestConfig, AxiosResponse } from 'axios' //导入相应类型

//封装请求响应拦截器接口
export interface HYRequestInterceptors {
  //请求拦截类型
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  //响应拦截类型
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

//扩展类型
export interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors //拦截器参数可选
  showLoading?: boolean
}
