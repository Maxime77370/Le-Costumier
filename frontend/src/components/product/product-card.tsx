import React from 'react'
import { Product } from 'types/product'

import { ProductBadge } from '@/components/product/product-badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

type ProductCardProps = {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={className}>
      <CardHeader className=' p-0'>
        <img src={product.image} alt={product.name} className='rounded-t-lg' />
      </CardHeader>
      <CardContent className='mt-4 flex flex-col items-start space-y-1'>
        <CardTitle>{product.name}</CardTitle>
        <ProductBadge product={product} className='' />
        <CardDescription>{product.description}</CardDescription>

        <div className='flex w-full items-center justify-between'>
          <span className='font-semibold text-primary'>
            {product.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </span>
          <Button variant='secondary'>Add to cart</Button>
        </div>
      </CardContent>
    </Card>
  )
}
