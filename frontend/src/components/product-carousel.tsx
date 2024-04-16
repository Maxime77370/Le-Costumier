import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'

type ProductCarouselProps = {
  limit: number
  className?: string
  orderBy?: { String: 'asc' | 'desc' }
}

export function ProductCarousel({
  limit = 5,
  className,
  orderBy
}: ProductCarouselProps) {
  const productsList = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 300,
      image: 'https://via.placeholder.com/150'
    }
  ]

  return (
    <Separator>
      <div className={className}>
        <Carousel
          opts={{
            align: 'start'
          }}
          className='w-full max-w-sm'
        >
          <CarouselContent>
            {productsList.slice(0, limit).map(product => (
              <CarouselItem
                key={product.id}
                className='md:basis-1/2 lg:basis-1/3 '
              >
                <Card>
                  <CardContent className='flex aspect-square items-center justify-center p-0'>
                    <img src={product.image} alt={product.name} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Separator>
  )
}
