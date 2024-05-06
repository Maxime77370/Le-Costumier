import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { getProductById } from '@/api/products'
import { AddToCart } from '@/components/cart/add-to-card'
import { CategoryBadge } from '@/components/categories/category-badge'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

const options = (productId: string) =>
  queryOptions({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    select: res => res.data,
    enabled: productId !== null
  })

export const Route = createFileRoute('/_layout/products/$productId')({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(options(params.productId)),
  component: ProductPage
})

function ProductPage() {
  const param = Route.useParams()
  const router = useRouter()

  const productQuery = useSuspenseQuery(options(param.productId))
  const product = productQuery.data

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
        <div className='grid grid-cols-5'>
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

              {product.categories.map(category => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>

            <AddToCart productId={product.id} />
          </div>
        </div>
      </div>
    </>
  )
}
