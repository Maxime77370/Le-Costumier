import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Suspense } from 'react'

import { getProducts } from '@/api/products'
import { ProductCarousel } from '@/components/products/product-carousel'
import { Button } from '@/components/ui/button'

const options = queryOptions({
  queryKey: ['products', 'last-10'],
  queryFn: () => getProducts({ limit: 10, sort: 'name', order: 'desc' }),
  select: res => res.data
})

export const Route = createFileRoute('/_layout/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(options),
  component: Index
})

function Index() {
  const productsQuery = useSuspenseQuery(options)
  const products = productsQuery.data

  return (
    <>
      <Suspense fallback='Loading products...'>
        <Link
          to='/products'
          className='flex h-60 flex-col items-center justify-evenly'
        >
          <span className='font-bold text-5xl'>Le Costumier</span>

          <Button>View all products</Button>
        </Link>

        <ProductCarousel products={products} className='mx-auto w-4/5' />
      </Suspense>
    </>
  )
}
