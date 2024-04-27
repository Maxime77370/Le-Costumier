import { useState } from 'react' // Importer useState pour gérer l'état du zoom
import { Product } from 'types/product'

import '../product.less' // Importer le fichier CSS pour le zoom

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ProductCategoriesBadge } from '../product-categories-badge'

type ProductCardProps = {
  product: Product
  className?: string
}

function ProductCard({ product, className }: ProductCardProps) {
  // État pour déterminer si la souris survole l'image
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={
        className +
        (isHovered
          ? ' hover-background-shining-on '
          : ' hover-background_shining-off')
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className='overflow-hidden p-0'>
        <img
          src={product.image}
          alt={product.name}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className={isHovered ? 'hover-zoom-on' : 'hover-zoom-off'}
        />
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
