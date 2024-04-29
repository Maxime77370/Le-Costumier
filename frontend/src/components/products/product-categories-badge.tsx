import { useNavigate } from '@tanstack/react-router'
import { Product } from 'types/product'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type ProductCategoriesBadgeProps = {
  product: Product
  className?: string
}

function ProductCategoriesBadge({
  product,
  className
}: ProductCategoriesBadgeProps) {
  const navigate = useNavigate({ from: '/products' })

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault()
    e.stopPropagation()
    navigate({
      to: '/products',
      search: { categories: category }
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={cn('flex w-fit justify-between gap-2', className)}>
      {product.categories.map(category => (
        <Badge
          key={category.id}
          style={{ backgroundColor: category.color }}
          className='text-white transition duration-300 ease-in-out hover:scale-110'
          onClick={e => handleCategoryClick(e, category.name)}
        >
          {category.name}
        </Badge>
      ))}
    </div>
  )
}

export { ProductCategoriesBadge }
