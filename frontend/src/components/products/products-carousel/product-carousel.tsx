import { Product } from 'types/product'

import { ProductCard } from '@/components/products/products-carousel/product-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

type ProductCarouselProps = {
  products: Product[]
  className?: string
}

function ProductCarousel({ products, className }: ProductCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true
      }}
      className={cn('mx-10', className)}
    >
      <CarouselContent>
        {products.map(product => (
          <CarouselItem key={product.id} className='md:basis-1/2 lg:basis-1/3 '>
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export { ProductCarousel }
