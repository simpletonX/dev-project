import axios, { AxiosInstance } from 'axios'
import toast from '../plugins/primevue/toast'
import app from '../app'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    let severity

    switch (response.data.code) {
      case 401:
        severity = 'warn'
        break
      default:
        break
    }
    if (severity) {
      const summaryLabel = app.config.globalProperties.$t('backendResponse')
      toast({
        severity,
        summary: `${summaryLabel}: ${response.data.message}`,
        closable: false,
      })
    }

    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
