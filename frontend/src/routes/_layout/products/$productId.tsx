import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'

import { getProductById, getProducts } from '@/api/products'
import { AddToCart } from '@/components/cart/add-to-card'
import { CategoryBadge } from '@/components/categories/category-badge'
import { Icons } from '@/components/icons'
import { ProductTable } from '@/components/products/products-table'
import { Button } from '@/components/ui/button'

const optionsById = (productId: string) =>
  queryOptions({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    select: res => res.data,
    enabled: productId !== null
  })

const options = queryOptions({
  queryKey: ['products', 'last-10'],
  queryFn: () => getProducts({ limit: 10, sort: 'name', order: 'desc' }),
  select: res => res.data
})

export const Route = createFileRoute('/_layout/products/$productId')({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(optionsById(params.productId)),
  component: ProductPage
})

function ProductPage() {
  const param = Route.useParams()
  const router = useRouter()

  const productQuery = useSuspenseQuery(optionsById(param.productId))
  const product = productQuery.data

  const otherProductsQuery = useSuspenseQuery(options)
  const otherProducts = otherProductsQuery.data

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
      </div>

      <div className='mt-4'>
        <div className='mr-10 grid gap-5 md:grid-cols-5'>
          <div className='col-span-3 flex max-h-[500px] items-center justify-center'>
            <img
              src={product.photo}
              alt={product.name}
              className='h-full object-fill'
            />
          </div>

          <div className='col-span-2 flex flex-col justify-between'>
            <div>
              <h3 className='font-bold text-2xl'>{product.name}</h3>
              <p className='text-xl'>
                {product.price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </p>

              <p className='mt-4 text-sm leading-none text-muted-foreground'>
                Description
              </p>
              <p>{product.description}</p>

              <p className='mb-1 mt-4 text-sm leading-none text-muted-foreground'>
                Categories
              </p>

              <div className='flex flex-wrap gap-1'>
                {product.categories.map(category => (
                  <CategoryBadge key={category.id} category={category} />
                ))}
              </div>
            </div>
            <AddToCart productId={product.id} className='mt-4' />
          </div>
        </div>
        <div className='mt-8'>
          <span className='font-bold text-xl'>Other products</span>
          <ProductTable products={otherProducts} className='' />
          <Link to='/products' className='mt-4 flex justify-center'>
            <Button>View all products</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
