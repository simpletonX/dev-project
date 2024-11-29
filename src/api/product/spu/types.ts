import type { ResponseData } from '@/api/types'

// SPU分页列表
export interface recordItem {
  id: number | string
  createTime: string
  updateTime: string
  spuName: string
  description: string
  category3Id: number
  tmId: number
  spuSaleAttrList: any
  spuImageList: any
  spuPosterList: any
}
export interface SpuResponseData extends ResponseData {
  data: {
    records: recordItem[]
    total: number
  }
}

// SPU新增/修改的请求体
export interface SpuBodyData {
  id?: number
  category3Id: number
  description: string
  spuImageList: BrandImageItem[]
  spuName: string
  spuPosterList: BrandImageItem[]
  spuSaleAttrList: Array<{
    id: number
    baseSaleAttrId: number
    saleAttrName: string
    spuId: number
    spuSaleAttrValueList: Array<{
      baseSaleAttrId: number
      id: number
      isChecked: string
      saleAttrName: string
      saleAttrValueName: string
      spuId: number
    }>
  }>
  tmId: number
}

// 可选品牌列表
export interface SelectBrandItem {
  id: number
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}
export interface SelectBrandResponseData extends ResponseData {
  data: SelectBrandItem[]
}

// SPU品牌图片墙
export interface BrandImageItem {
  id: number
  createTime: string
  updateTime: string
  spuId: number
  imgName: string
  imgUrl: string
}
export interface BrandImageResponseData extends ResponseData {
  data: BrandImageItem[]
}

// SPU销售属性列表
export interface SaleAttrItem {
  baseSaleAttrId: number
  createTime: string
  id: number
  saleAttrName: string
  spuId: number
  spuSaleAttrValueList: Array<{
    baseSaleAttrId: number
    createTime: string
    id: number
    isChecked: string
    saleAttrName: string
    saleAttrValueName: string
    spuId: number
    updateTime: string
  }>
}
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttrItem[]
}
