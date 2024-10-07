export interface LoginBody {
  username: string
  password: string
}

export interface LoginResponse {
  code: number
  data: {
    token?: string
    message?: string
  }
}

interface UserInfoResponseData {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
}
export interface UserInfoResponse {
  code: number
  data: UserInfoResponseData
}
