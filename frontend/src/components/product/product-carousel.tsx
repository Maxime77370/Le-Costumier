import { ProductCard } from '@/components/product/product-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { fakeProducts } from '../../fakeData'

type ProductCarouselProps = {
  className?: string
  limit?: number
  orderBy?: { String: 'asc' | 'desc' }
}

export function ProductCarousel({
  limit = undefined,
  className,
  orderBy = undefined
}: ProductCarouselProps) {
  const productsList = fakeProducts

  return (
    <Separator>
      <div className={className}>
        <Carousel
          opts={{
            align: 'start',
            loop: true
          }}
          className='w-full max-w-[calc(200vw/3)]'
        >
          <CarouselContent>
            {productsList.slice(0, limit).map(product => {
              console.log(product)
              return (
                <CarouselItem
                  key={product.id}
                  className='md:basis-1/2 lg:basis-1/3 '
                >
                  <ProductCard product={product} className='aspect-square' />
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Separator>
  )
}
