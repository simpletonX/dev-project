import request from '@/api/request'
import { LoginBody, LoginResponse, UserInfoResponseData } from '@/api/user/types'

enum API {
  LOGIN = '/acl/index/login', // 登录
  USER_INFO = '/acl/index/info', // 获取用户信息
  LOGOUT = '/acl/index/logout', // 退出登录
}

export const login = (data: LoginBody) => {
  return request.post<any, LoginResponse>(API.LOGIN, data)
}
export const getUserInfo = () => {
  return request.get<any, UserInfoResponseData>(API.USER_INFO)
}
export const logout = () => {
  return request.post(API.LOGOUT)
}
