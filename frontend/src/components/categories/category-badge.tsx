import { Category } from 'types/category'

import { Badge } from '@/components/ui/badge'

type categoryBadgeProps = {
  category: Category
  className?: string
}

function CategoryBadge({ category, className }: categoryBadgeProps) {
  return (
    <div className={`${className || ''}`}>
      <Badge
        style={{ backgroundColor: category.color }}
        className='cursor-pointer text-white transition duration-300 ease-in-out hover:scale-110'
      >
        {category.name}
      </Badge>
    </div>
  )
}

export { CategoryBadge }
