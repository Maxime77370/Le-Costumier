import { Product } from 'types/product'

import { ProductCard } from '@/components/products/product-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselOptions,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

type ProductCarouselProps = {
  products: Product[]
  opts?: CarouselOptions
  className?: string
}

function ProductCarousel({ products, opts, className }: ProductCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        ...opts
      }}
      className={cn('mx-10', className)}
    >
      <CarouselContent>
        {products.map(product => (
          <CarouselItem
            key={product.id}
            className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
          >
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
