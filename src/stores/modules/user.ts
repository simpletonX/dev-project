import toast from '@/utils/primevue-service/toast'
import { setLocalStorage, getLocalStorage } from '@/utils/localStorge'
import { login, getUserInfo, logout } from '@/api/user'
import { LoginBody, UserInfoData } from '@/api/user/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(getLocalStorage('token') || '')
  const userInfo = ref<UserInfoData>({})

  async function loginAction(data: LoginBody, successMsg: string) {
    const res = await login(data)

    if (res.code === 200) {
      token.value = res.data as string
      setLocalStorage('token', token.value)
      toast({
        severity: 'success',
        summary: successMsg,
        closable: false,
      })

      return res
    }
  }

  async function getInfoAction() {
    const res = await getUserInfo()
    userInfo.value = res.data || {}
  }

  async function logoutAction() {
    await logout()
    setLocalStorage('token', '')
    token.value = ''
    userInfo.value = {}
  }

  return {
    token,
    userInfo,
    loginAction,
    getInfoAction,
    logoutAction,
  }
})
