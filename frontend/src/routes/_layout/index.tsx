import { createFileRoute } from '@tanstack/react-router'

import { ProductCardList } from '@/components/products/product-card-list/products-card-list'
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
      <ProductCardList products={fakeProducts} className='mx-auto w-2/3' />
    </div>
  )
}
