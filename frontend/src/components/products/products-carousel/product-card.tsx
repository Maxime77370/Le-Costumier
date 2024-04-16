import { Product } from 'types/product'

import { Button } from '@/components/ui/button'
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
    <Card className={className}>
      <CardHeader className='p-0'>
        <img src={product.image} alt={product.name} />
      </CardHeader>

      <CardContent className='space-y-1 pt-4'>
        <CardTitle>{product.name}</CardTitle>

        <ProductCategoriesBadge product={product} />

        <CardDescription>{product.description}</CardDescription>

        <div className='flex w-full items-center justify-between pt-2'>
          <span className='font-semibold'>
            {product.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </span>

          <Button variant='secondary' size='sm'>
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { ProductCard }
