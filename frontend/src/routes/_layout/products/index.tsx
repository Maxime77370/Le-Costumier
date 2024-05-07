import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'

import { getProducts } from '@/api/products'
import { Icons } from '@/components/icons'
import { ProductsCardGrid } from '@/components/products/products-card-grid'
import { ProductsFilter } from '@/components/products/products-filter/products-filter'
import { ProductTable } from '@/components/products/products-table'
import { Button } from '@/components/ui/button'

const searchSchema = z.object({
  name: z.string().optional(),
  categories: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional()
})

const options = (search: z.infer<typeof searchSchema>) =>
  queryOptions({
    queryKey: ['products', { search }],
    queryFn: () => getProducts(search),
    select: res => res.data
  })

export const Route = createFileRoute('/_layout/products/')({
  validateSearch: search => searchSchema.parse(search),
  loaderDeps: ({ search }) => ({ ...search }),
  loader: ({ deps, context: { queryClient } }) =>
    queryClient.ensureQueryData(options(deps)),
  component: Products,
  pendingMs: Infinity
})

function Products() {
  const search = Route.useSearch()
  const router = useRouter()

  const productsQuery = useSuspenseQuery(options(search))
  const products = productsQuery.data

  const [isList, setIsList] = useState(false)
  const toggleListMode = () => setIsList(prev => !prev)

  const IconMode = isList ? Icons.list : Icons.grid

  return (
    <>
      <div className='sticky top-16 z-10 mt-[2.5rem] flex w-full justify-between'>
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

      <div className='mx-12 mt-[-4.5rem]'>
        <h2 className='font-semibold text-2xl'>Featured Products</h2>

        <ProductsFilter className='mt-2' />

        {isList ? (
          <ProductTable products={products} className='mt-4' />
        ) : (
          <ProductsCardGrid products={products} className='mt-4' />
        )}
      </div>
    </>
  )
}
