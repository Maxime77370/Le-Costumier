import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ProductResult } from 'types/api/products'
import { z } from 'zod'

import { getProducts } from '@/api/products'
import { Icons } from '@/components/icons'
import { ProductsCardGrid } from '@/components/products/products-card-grid'
import { ProductsFilter } from '@/components/products/products-filter/products-filter'
import { ProductTable } from '@/components/products/products-table'
import { Button } from '@/components/ui/button'
import { router } from '@/router'

const searchSchema = z.object({
  name: z.string().optional(),
  categories: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional()
})

export const Route = createFileRoute('/_layout/products/')({
  component: Products,
  validateSearch: search => searchSchema.parse(search)
})

function Products() {
  const [isList, setIsList] = useState(false)

  const IconMode = isList ? Icons.list : Icons.grid

  const search = Route.useSearch()

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'search', { search }],
    queryFn: () => getProducts(search),
    select: res => res.data as ProductResult[]
  })

  const toggleListMode = () => setIsList(prev => !prev)

  return (
    <>
      <div className='sticky top-0 z-10 flex w-full justify-between'>
        <Button
          size='icon'
          variant='ghost'
          className='mt-2 size-8'
          onClick={() => router.history.back()}
        >
          <Icons.arrowLeft />
        </Button>

        <Button
          size='icon'
          variant='ghost'
          className='mt-2 size-8'
          onClick={toggleListMode}
        >
          <IconMode />
        </Button>
      </div>

      <div className='mx-12'>
        <h2 className='font-semibold text-2xl'>Featured Products</h2>

        <ProductsFilter className='mt-2' />

        {isLoading || !data ? (
          <div>Loading...</div>
        ) : isList ? (
          <ProductTable products={data} className='mt-4' />
        ) : (
          <ProductsCardGrid products={data} className='mt-4' />
        )}
      </div>
    </>
  )
}
