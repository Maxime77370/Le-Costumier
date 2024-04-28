import { createFileRoute } from '@tanstack/react-router'
import { Category } from 'types/category'
import { Product } from 'types/product'

import { ProductCard } from '@/components/products/product-card-horizontal'
import { ProductCardList } from '@/components/products/product-card-list/products-card-list'
import { ProductCarousel } from '@/components/products/products-carousel/product-carousel'
import { fakeProducts } from '@/fakeData'

export const Route = createFileRoute('/_layout/product/$productId')({
  component: ProductID
})

function ProductID() {
  const param = Route.useParams()
  const product = fakeProducts.find(p => p.id === param.productId)
  const relatedProducts = fakeProducts.filter(
    (p: Product) =>
      product &&
      p.id !== product.id && // Vérifier que l'ID du produit est différent
      p.categories.some(
        (category: Category) =>
          category.name.toLowerCase() ===
          product.categories[0].name.toLowerCase()
      )
  )
  const otherProducts = fakeProducts.filter(
    (p: Product) =>
      product &&
      p.id !== product.id && // Vérifier que l'ID du produit est différent
      !p.categories.some(
        (category: Category) =>
          category.name.toLowerCase() ===
          product.categories[0].name.toLowerCase()
      )
  )

  return (
    <div className='flex flex-col items-center'>
      {product ? (
        <>
          <span className='mt-4 text-2xl font-semibold'>Product</span>
          <ProductCard product={product} className='mt-4 w-2/3' />
          <span className='mt-4 text-2xl font-semibold'>Related Products</span>
          <ProductCarousel products={relatedProducts} className='mt-4 w-3/4' />
        </>
      ) : (
        <h1>Product not found</h1>
      )}
      <span className='mt-4 text-2xl font-semibold'>Other Products</span>
      <ProductCardList products={otherProducts} className='mt-4 w-3/4' />
    </div>
  )
}
