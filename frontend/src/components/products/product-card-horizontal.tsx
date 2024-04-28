import { Link } from '@tanstack/react-router'
import { Product } from 'types/product'

import { AddToCart } from '@/components/cart/add-to-card'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ProductCategoriesBadge } from './product-categories-badge'

type ProductCardProps = {
  product: Product
  className?: string
}

function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className={className}>
      <Card className={' grid grid-cols-3 grid-rows-1'}>
        <CardHeader className='col-span-2 p-0'>
          <img src={product.image} alt={product.name} />
        </CardHeader>
        <CardContent className='col-span-1 flex flex-col justify-between space-y-1 pt-4'>
          <div className='flex flex-col space-y-1'>
            <CardTitle>{product.name}</CardTitle>
            <ProductCategoriesBadge product={product} />
            <CardDescription>{product.description}</CardDescription>
          </div>

          {/* Moved to the bottom */}
          <div className='flex items-center justify-between'>
            <span className='font-semibold'>
              {product.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </span>
            <AddToCart productId={product.id} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export { ProductCard }
