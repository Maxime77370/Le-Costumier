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
      className={className}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Card
        className={
          ' grid grid-cols-3 grid-rows-1' +
          (isHovered
            ? ' hover-background-shining-on '
            : ' hover-background_shining-off')
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className='col-span-2 overflow-hidden p-0'>
          <img
            src={product.image}
            alt={product.name}
            className={isHovered ? 'hover-zoom-on' : 'hover-zoom-off'}
          />
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
