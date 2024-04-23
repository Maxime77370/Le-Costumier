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
  return (
    <div className={cn('flex w-fit justify-between gap-2', className)}>
      {product.categories.map(category => (
        <Badge
          key={category.id}
          style={{ backgroundColor: category.color }}
          className='text-white transition duration-300 ease-in-out hover:scale-110'
          onClick={() => console.log('Category:', category)} // Change for redirect to category page
        >
          {category.name}
        </Badge>
      ))}
    </div>
  )
}

export { ProductCategoriesBadge }
