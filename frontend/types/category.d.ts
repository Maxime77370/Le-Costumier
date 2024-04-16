export type Category = {
  id: string
  name: string
  subCategories?: Category[]
  parentCategory?: Category
  image: string
  color: string
}
