import React from 'react'
import { Category } from 'types/category'

type CategoryIconProps = {
  category: Category
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  const Icon = typeof category.icon === 'string' ? category.icon : category.icon

  return (
    <div className='flex items-center'>
      {Icon && <Icon className='mr-2 h-4 w-4' />}
    </div>
  )
}

export { CategoryIcon }
