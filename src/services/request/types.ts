import type { AxiosRequestConfig, AxiosResponse } from 'axios' //导入相应类型

//封装请求响应拦截器接口,使用泛型并给默认类型
export interface HYRequestInterceptors<T = AxiosResponse> {
  //请求拦截类型
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  //响应拦截类型
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

//扩展类型
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T> //拦截器参数可选
  showLoading?: boolean
}
