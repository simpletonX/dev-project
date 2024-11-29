import { AttributeListResponseData, AttributeRequestData } from '@/api/product/attribute/types'
import request from '@/api/request'

enum API {
  ATTRLIST = '/product/attrInfoList/',
  INSERTATTR = '/product/saveAttrInfo',
  DELETEATTR = '/product/deleteAttr/',
}

// categoryIds -> id/id/id
export const getAttributeList = (categoryIds: string) => {
  return request.get<any, AttributeListResponseData>(API.ATTRLIST + categoryIds)
}

export const insertAttribute = (data: AttributeRequestData) => {
  return request.post<any, any>(API.INSERTATTR, data)
}

export const deleteAttribute = (id: number) => {
  return request.delete<any, any>(API.DELETEATTR + id)
}
