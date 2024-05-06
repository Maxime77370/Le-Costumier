import { AddToCartInput, CartResult } from 'types/api/cart'

import { instance } from './instance'

export function getCart() {
  return instance.get<CartResult>('/carts')
}

export function addToCart(input: AddToCartInput) {
  return instance.put(`/carts/${input.productId}`)
}

export function removeFromCart(input: AddToCartInput) {
  return instance.delete(`/carts/${input.productId}`)
}
