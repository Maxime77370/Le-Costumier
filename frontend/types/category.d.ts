import LucideIcon from 'react-lucide'

export type Category = {
  id: number
  name: string
  subCategories?: Category[]
  parentCategory?: Category
  image: string
  icon: LucideIcon
  color: string
}
