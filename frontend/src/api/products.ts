import {
  ProductsPaginationParams,
  type ProductResult
} from 'types/api/products'

import { instance } from './instance'

export function getProductById(productId: string) {
  return instance.get<ProductResult>(`/products/${productId}`)
}

export function getProducts(options: ProductsPaginationParams) {
  return instance.get<ProductResult[]>('/products', {
    params: options
  })
}
