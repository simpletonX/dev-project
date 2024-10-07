import toast from '@/modules/primevue-service/toast'
import { setLocalStorage } from '@/modules/localStorge'
import { login } from '@/service/user'
import { LoginBody } from '@/service/user/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  const loginAction = async (data: LoginBody, successMsg: string) => {
    const res = await login(data)

    if (res.code === 200) {
      token.value = res.data.token as string
      setLocalStorage('token', token.value)
      toast({
        severity: 'success',
        summary: successMsg,
        closable: false,
      })

      return res
    }
  }

  return {
    token,
    loginAction,
  }
})
