import { Category } from './category'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  categories: Category[]
}
