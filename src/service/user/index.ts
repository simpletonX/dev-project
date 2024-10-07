import request from '@/service/request'
import { LoginBody, LoginResponse, UserInfoResponse } from '@/service/user/types'

export const login = (data: LoginBody) => {
  return request.post<any, LoginResponse>('/user/login', data)
}

export const getUserInfo = () => {
  return request.get<UserInfoResponse>('/user/info')
}
