import { Link } from '@tanstack/react-router'
import { Product } from 'types/product'

import { AddToCart } from '@/components/cart/add-to-card'
import { Card, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CategoryBadge } from '../categories/category-badge'

type ProductCardProps = {
  product: Product
  className?: string
}

function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className={cn('group', className)}>
      <Card className='h-full'>
        <div className='overflow-hidden'>
          <img
            src={product.photo}
            alt={product.name}
            className='transition-transform duration-500 group-hover:scale-105'
          />
        </div>

        <div className='relative h-max p-4'>
          <CardTitle className='font-medium'>{product.name}</CardTitle>

          <div className='mb-4 mt-1 flex flex-wrap gap-1'>
            {product.categories.map(category => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>

          <div className='flex items-center justify-between place-self-end'>
            <span>
              {product.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </span>

            <AddToCart productId={product.id} size='sm' className='text-sm' />
          </div>
        </div>
      </Card>
    </Link>
  )
}

export { ProductCard }
