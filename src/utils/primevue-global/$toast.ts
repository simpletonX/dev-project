import { ToastServiceMethods } from 'primevue/toastservice'

let $toast: ToastServiceMethods

export const setToastInstance = (instance: ToastServiceMethods) => {
  $toast = instance
}

export default {
  success(message: string, title?: string) {
    $toast.add({ severity: 'success', summary: title, detail: message, life: 3000 })
  },
  error(message: string, title = '错误') {
    $toast.add({ severity: 'error', summary: title, detail: message, life: 3000 })
  },
  info(message: string, title = '信息') {
    $toast.add({ severity: 'info', summary: title, detail: message, life: 3000 })
  },
  warn(message: string, title = '警告') {
    $toast.add({ severity: 'warn', summary: title, detail: message, life: 3000 })
  },
}
