import request from '@/api/request'
import { SpuResponseData, SelectBrandResponseData, BrandImageResponseData } from './types'

enum API {
  SPU_LIST = '/product', // 分页列表
  SELECT_BRANDS = '/product/baseTrademark/getTrademarkList', // 获取可选品牌列表
  BRAND_IMAGES = '/product/spuImageList', // 获取SPU品牌图片墙
  SALE_ATTRS = '/product/spuSaleAttrList', // 获取SPU销售属性列表
}

// 获取SPU分页列表
export const getBrandList = (page: number, limit: number, category3Id: number) => {
  return request.get<any, SpuResponseData>(`${API.SPU_LIST}/${page}/${limit}?category3Id=${category3Id}`)
}

// 获取可选品牌列表
export const getSelectBrands = () => {
  return request.get<any, SelectBrandResponseData>(API.SELECT_BRANDS)
}

// 获取SPU品牌图片墙
export const getBrandImages = (spuId: number) => {
  return request.get<any, BrandImageResponseData>(`${API.BRAND_IMAGES}/${spuId}`)
}

// 获取SPU销售属性列表
export const getSaleAttrs = (spuId: number) => {
  return request.get<any, any>(`${API.SALE_ATTRS}/${spuId}`)
}
