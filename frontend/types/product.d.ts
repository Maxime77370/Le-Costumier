import { Category } from './category'

export type Product = {
  id: number
  name: string
  description: string
  price: number
  photo: string
  categories: Category[]
}
