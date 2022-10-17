import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { ElLoading } from 'element-plus'
import { HYRequestConfig, HYRequestInterceptors } from './types'

const DEFAULT_LOADING = true

//使用类进行封装，封装性更强
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  loading?: any
  showLoading: boolean

  constructor(config: HYRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config) //每次都创建不同的实例
    //保存基本信息
    this.interceptors = config.interceptors //保存不同的interceptors，每个实例可以有不同的拦截器
    this.showLoading = config.showLoading ?? DEFAULT_LOADING //记录是否显示loading，可传入，默认false

    //初始化使用拦截器
    //一：从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //二：添加所有实例都有的拦截器（全局拦截）
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有请求成功拦截')
        if (this.showLoading) {
          //根据showLoading来判断是否显示loading界面
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有响应成功拦截')
        this.loading?.close() //移除loading
        const data = res.data
        if (data.returnCode === '-1001') {
          // console.log('请求失败')
        } else {
          return data
        }
        // return data
      },
      (error) => {
        //判断不同的的ErrorCode显示不同的错误信息
        // if(error.response.status === 404)
        this.loading?.close() //取消loading
        return error
      }
    )
  }

  //定义request请求方法
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //三：单独请求的拦截器,对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config) //设置泛型进行res的类型设定
        .then((res) => {
          //1.单独响应的拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING //2.请求完成后设置成初始化值
          //3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err) //将结果reject返回出去
          return err
        })
    })
  }

  //get方法
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'GET'
    })
  }
  //post方法
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST'
    })
  }
  //delete方法
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'DELETE'
    })
  }
  //patch方法
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PATCH'
    })
  }
}

export default HYRequest
