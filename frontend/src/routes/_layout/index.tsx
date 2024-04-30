import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

import { getProducts } from '@/api/products'
import { ProductCarousel } from '@/components/products/product-carousel'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_layout/')({
  component: Index
})

function Index() {
  const { data, isLoading } = useQuery({
    queryKey: ['products', 'last-10'],
    queryFn: () => getProducts({ limit: 10, sort: 'name', order: 'desc' }),
    select: res => res.data
  })

  return (
    <>
      <Link
        to='/products'
        className='flex h-60 flex-col items-center justify-evenly'
      >
        <span className='font-bold text-5xl'>Le Costumier</span>

        <Button>View all products</Button>
      </Link>

      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <ProductCarousel products={data} className='mx-auto w-4/5' />
      )}
    </>
  )
}
