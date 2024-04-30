import { CategoriesResult } from 'types/api/categories'

import { instance } from './instance'

export function getCategories() {
  return instance.get<CategoriesResult>('/categories')
}
