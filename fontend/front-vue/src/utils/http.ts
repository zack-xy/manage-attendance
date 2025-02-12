import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '@/store';
import type { StateAll } from '@/store';
import { ElMessage } from 'element-plus';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  if(config.headers) {
    config.headers.authorization = (store.state as StateAll).users.token
  }
  return config;
}, error => {
  return Promise.reject(error);
})

instance.interceptors.response.use(res => {
  if(res.data.errmsg === 'token error' ) {
    ElMessage.error('token error')
    store.commit('users/clearToken')
    setTimeout(() => {
      window.location.replace('/login')
    }, 1000);
  }
  return res;
}, error => {
  return Promise.reject(error);
})

export interface Data {
  [index: string]: unknown
}

interface Http {
  get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config
    })
  },
  post(url, data, config) {
    return instance.post(url, data, config)
  },
  put(url, data, config) {
    return instance.put(url, data, config)
  },
  patch(url, data, config) {
    return instance.patch(url, data, config)
  },
  delete(url, data, config) {
    return instance.delete(url, {
      data,
      ...config
    })
  }
}

export default http;
 