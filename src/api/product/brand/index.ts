import request from '@/api/request'
import { BrandListResponseData, BrandBodyData } from './types'

enum API {
  BRAND_LIST = '/product/baseTrademark', // 品牌分页列表
  INSERT_BRAND = '/product/baseTrademark/save', // 新增品牌
  UPDATE_BRAND = '/product/baseTrademark/update', // 修改品牌
  DELETE_BRAND = '/product/baseTrademark/remove', // 删除品牌
}

export const getBrandList = (page: number, limit: number) => {
  return request.get<any, BrandListResponseData>(`${API.BRAND_LIST}/${page}/${limit}`)
}

export const insertBrand = (data: BrandBodyData) => {
  return request.post<any, any>(API.INSERT_BRAND, data)
}

export const updateBrand = (data: BrandBodyData) => {
  return request.put<any, any>(API.UPDATE_BRAND, data)
}

export const deleteBrand = (id: number) => {
  return request.delete<any, any>(`${API.DELETE_BRAND}/${id}`)
}
