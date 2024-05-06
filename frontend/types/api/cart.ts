import { Product } from 'types/product'

export interface CartResult {
  id: number
  products: Product[]
}

export interface AddToCartInput {
  productId: number
}
