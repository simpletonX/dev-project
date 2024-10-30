import axios from 'axios'
import toast from '@/utils/primevue-service/toast'
import app from '@/main'
import { useUserStore } from '@/stores/modules/user'
import router from '@/router'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/admin',
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    const { token } = useUserStore()
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    let severity: string = ''
    let message: string = response.data.message

    switch (response.data.code) {
      case 200:
        break
      case 203: // 登录过期/[服务异常]
        const { logoutAction } = useUserStore()
        logoutAction()
        router.push('/login')
        severity = 'warn'
        message = 'Authentication failure' // 登录过期message
        break
      default:
        severity = 'warn'
        break
    }
    if (severity) {
      const summaryLabel = app.config.globalProperties.$t('backendResponse')
      toast({
        severity,
        summary: `${summaryLabel}: ${message}`,
        closable: false,
      })
      return Promise.reject(message)
    }
    return response.data
  },
  (error) => {
    toast({
      severity: 'error',
      summary: 'Error',
      message: error.message,
      closable: false,
    })
    return Promise.reject(error)
  }
)

export default instance
