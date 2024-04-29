import { createFileRoute, Link } from '@tanstack/react-router'
import { Space } from 'lucide-react'

import { ProductCarousel } from '@/components/products/products-carousel/product-carousel'
import { Button } from '@/components/ui/button'
import { fakeProducts } from '@/fakeData'

export const Route = createFileRoute('/_layout/')({
  component: Index
})

function Index() {
  return (
    <div className='mt-2'>
      <Link
        to='/products'
        className='flex h-64 flex-col items-center justify-evenly'
      >
        <span className='font-bold text-5xl'>Le Costumier</span>
        <Button>View All Products</Button>
      </Link>
      <div className='flex flex-col items-center'>
        <ProductCarousel
          products={fakeProducts}
          className='mx-auto mt-4 w-3/4'
        />
      </div>
    </div>
  )
}
