export interface ProductResult {
  id: number
  name: string
  description: string
  price: number
  photo: string
  categories: Category[]
}

export interface ProductsPaginationParams {
  name?: string
  categories?: string
  price?: number
  limit?: number
  offset?: number
  sort?: string
  order?: 'asc' | 'desc'
}
