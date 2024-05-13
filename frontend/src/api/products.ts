import {
  ProductsPaginationParams,
  type ProductResult
} from 'types/api/products'

import { instance } from './instance'

export function getProductById(productId: string) {
  return instance.get<ProductResult>(`/products/${productId}`)
}

export async function getProducts(options: ProductsPaginationParams) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return instance.get<ProductResult[]>('/products', {
    params: options
  })
}
