// 接口响应类型
export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
  ok: boolean
}
