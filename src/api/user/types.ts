import type { ResponseData } from '@/api/types'

// 登录接口的 RequestData
export interface LoginBody {
  username: string
  password: string
  createTime?: string
  id?: number
  name?: string
  phone?: string
  roleName?: string
  updateTime?: string
}
// 登录接口的 ResponseData
export interface LoginResponse extends ResponseData {
  data: string
}

// 获取用户信息接口的 ResponseData
export interface UserInfoData {
  routes?: string[]
  buttons?: string[]
  roles?: string[]
  name?: string
  avatar?: string
}
export interface UserInfoResponseData extends ResponseData {
  data: UserInfoData
}
