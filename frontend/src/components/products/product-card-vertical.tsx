import { Link } from '@tanstack/react-router'
import { useState } from 'react'
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

import './product.css' // Importer le fichier CSS pour le zoom

type ProductCardProps = {
  product: Product
  className?: string
}

function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      to={`/products/${product.id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={className}
    >
      <Card
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={
          isHovered
            ? ' hover-background-shining-on '
            : ' hover-background_shining-off'
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className='overflow-hidden p-0'>
          <img
            src={product.image}
            alt={product.name}
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
            <AddToCart productId={product.id} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export { ProductCard }
