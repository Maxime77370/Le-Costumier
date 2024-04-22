import { Category } from 'types/category'

import { CategoryIcon } from './category-icon'

type CategoryNameIconProps = {
  category: Category
}

function CategoryNameIcon({ category }: CategoryNameIconProps) {
  return (
    <div className='flex items-center'>
      <CategoryIcon category={category} />
      {category.name}
    </div>
  )
}

export { CategoryNameIcon }
