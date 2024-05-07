import { Link } from '@tanstack/react-router'
import { Category } from 'types/category'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type categoryBadgeProps = {
  category: Pick<Category, 'name' | 'color'>
  className?: string
}

function CategoryBadge({ category, className }: categoryBadgeProps) {
  const handleClick = (e: React.MouseEvent<'a'>) => {
    e.stopPropagation()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Link
      to={`/products`}
      search={{ categories: category.name }}
      onClick={handleClick}
    >
      <Badge
        style={{ backgroundColor: category.color }}
        className={cn(
          'cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:saturate-200',
          className
        )}
      >
        {category.name}
      </Badge>
    </Link>
  )
}

export { CategoryBadge }
