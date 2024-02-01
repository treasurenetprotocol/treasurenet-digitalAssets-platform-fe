import axios, { type AxiosRequestConfig } from 'axios'
import { notification } from 'ant-design-vue'

const AXIOS_OPT = axios.create({
  timeout: 30000
})

// 添加请求拦截器
AXIOS_OPT.interceptors.request.use(
  (config) => {
    if (config.url !== '/api/getHexMsg' && config.url !== '/api/login') {
      const token = localStorage.getItem('tn_jwt')
      if (token) {
        config.headers['Authorization'] = token
      }
    }

    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
AXIOS_OPT.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      notification.error({
        message: 'Network Error',
        description: 'Please make sure your network is unblocked.',
      })
    } else {
      notification.error({
        message: 'Network Error',
        description: error.response.data,
      })
    }

    return Promise.reject(error)
  }
)

export default {
  get(url: string, params?: any, headers?: any) {
    let options: any = {}

    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }

    return AXIOS_OPT.get(url, options)
  },
  post(url: string, data: {}, config?: AxiosRequestConfig<any> | undefined) {
    if (!data) data = {}
    if (!config) config = {}
    Object.assign(config, { headers: { 'content-type': 'application/json' } })

    return AXIOS_OPT.post(url, data, config)
  },
  put(url: string, params?: any, headers?: any) {
    let options: any = {}
    headers['content-type'] = 'application/json'

    if (headers) {
      options.headers = headers
    }
    return AXIOS_OPT.put(url, params, options)
  },
  delete(url: string, params?: any, headers?: any) {
    let options: any = {}

    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return AXIOS_OPT.delete(url, options)
  },
}
