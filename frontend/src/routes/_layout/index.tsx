import { createFileRoute } from '@tanstack/react-router'

import { ProductCarousel } from '@/components/products/products-carousel/product-carousel'
import { fakeProducts } from '@/fakeData'

export const Route = createFileRoute('/_layout/')({
  component: Index
})

function Index() {
  return (
    <div className='mt-2'>
      <ProductCarousel products={fakeProducts} />
    </div>
  )
}
