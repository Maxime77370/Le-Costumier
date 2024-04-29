import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { icons } from 'lucide-react'
import { Category } from 'types/category'
import { Product } from 'types/product'

import { ProductCard } from '@/components/products/product-card-horizontal'
import { ProductCardList } from '@/components/products/product-card-list/products-card-list'
import { ProductCarousel } from '@/components/products/products-carousel/product-carousel'
import { fakeProducts } from '@/fakeData'

export const Route = createFileRoute('/_layout/products/$productId')({
  component: ProductID
})

function ProductID() {
  const param = Route.useParams()
  const product = fakeProducts.find(p => p.id === param.productId)
  const relatedProducts = fakeProducts.filter(
    (p: Product) =>
      product &&
      p.id !== product.id &&
      p.categories.some((category: Category) =>
        product.categories.includes(category)
      )
  )

  const otherProducts = product
    ? fakeProducts.filter(
        (p: Product) =>
          p.id !== product.id &&
          !p.categories.some(
            (category: Category) =>
              category.name.toLowerCase() ===
              product.categories[0].name.toLowerCase()
          )
      )
    : fakeProducts

  const backNavigation = useNavigate({ from: '/products/$productId' })

  return (
    <>
      <icons.ArrowLeft
        className='absolute left-0 top-0 ml-4 mt-4 cursor-pointer
      '
        size={24}
        onClick={() => backNavigation({ to: '/products' })}
      />
      <div className='flex flex-col items-center'>
        {product ? (
          <>
            <span className='mt-4 text-2xl font-semibold'>Product</span>
            <ProductCard product={product} className='mt-4 w-2/3' />
            {relatedProducts.length !== 0 ? (
              <>
                <span className='mt-4 text-2xl font-semibold'>
                  Related Products
                </span>
                <ProductCarousel
                  products={relatedProducts}
                  className='mt-4 w-3/4'
                />
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <span className='mt-4 text-xl font-semibold'>Product not found</span>
        )}
        <span className='mt-4 text-2xl font-semibold'>Other Products</span>
        <ProductCardList products={otherProducts} className='mt-4 w-3/4' />
      </div>
    </>
  )
}
