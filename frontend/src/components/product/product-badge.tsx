import React from 'react'
import { Product } from 'types/product'

import { Badge } from '@/components/ui/badge'

type ProductBadgeProps = {
  product: Product
  className?: string
}

export function ProductBadge({ product, className }: ProductBadgeProps) {
  return (
    <>
      {product.categories &&
        product.categories.map(category => (
          <React.Fragment key={category.id}>
            <Badge
              className={className + ' mr-2'}
              style={{ backgroundColor: category.color }}
              onClick={() => console.log('Category:', category)} // Change for redirect to category page
            >
              {category.name}
            </Badge>
          </React.Fragment>
        ))}
    </>
  )
}
