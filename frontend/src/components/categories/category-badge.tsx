import { Category } from 'types/category'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type categoryBadgeProps = {
  category: Pick<Category, 'name' | 'color'>
  className?: string
}

function CategoryBadge({ category, className }: categoryBadgeProps) {
  return (
    <Badge
      style={{ backgroundColor: category.color }}
      className={cn('cursor-pointer text-white', className)}
    >
      {category.name}
    </Badge>
  )
}

export { CategoryBadge }
