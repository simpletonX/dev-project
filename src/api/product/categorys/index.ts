import request from '@/api/request'
import type { CategoryListResponseData } from './types'

enum API {
  GET_CATEGORY1 = '/product/getCategory1',
  GET_CATEGORY2 = '/product/getCategory2',
  GET_CATEGORY3 = '/product/getCategory3',
}

export const getCategory1 = () => request.get<any, any>(API.GET_CATEGORY1)

export const getCategory2 = (id: number) => {
  return request.get<CategoryListResponseData, any>(`${API.GET_CATEGORY2}/${id}`)
}

export const getCategory3 = (id: number) => {
  return request.get<CategoryListResponseData, any>(`${API.GET_CATEGORY3}/${id}`)
}
