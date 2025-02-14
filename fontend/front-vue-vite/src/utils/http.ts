import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import router from '@/router';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  if(config.headers) {
    const userStore = useUserStore()
    const { token } = storeToRefs(userStore)
    config.headers.authorization = token.value
  }
  return config;
}, error => {
  return Promise.reject(error);
})

instance.interceptors.response.use(res => {
  if(res.data.errmsg === 'token error' ) {
    const usersStore = useUserStore()
    usersStore.clearToken()
    ElMessage.error('token error')
    setTimeout(() => {
      window.location.replace('/login')
    }, 1000);
  } else if(res.data.errmsg === 'error') {
    router.push('/500')
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
 