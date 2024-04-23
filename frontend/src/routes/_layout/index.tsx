import { createFileRoute } from '@tanstack/react-router'

import { ProductCarousel } from '@/components/products/products-carousel/product-carousel'
import { ProductTable } from '@/components/products/products-table/product-table'
import { fakeProducts } from '@/fakeData'

export const Route = createFileRoute('/_layout/')({
  component: Index
})

function Index() {
  return (
    <div className='mt-2'>
      <h2 className='mb-2 mt-4 text-2xl font-semibold'>Featured Products</h2>
      <ProductCarousel products={fakeProducts} />
      <ProductTable products={fakeProducts} />
    </div>
  )
}
