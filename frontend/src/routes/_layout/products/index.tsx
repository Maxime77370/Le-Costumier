import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { icons } from 'lucide-react'
import { useState } from 'react'

import { ProductCardList } from '@/components/products/product-card-list/products-card-list'
import { ProductFilter } from '@/components/products/product-filter'
import { ProductTable } from '@/components/products/products-table/product-table'
import { fakeProducts } from '@/fakeData'

type ProductSearch = {
  categories?: string
  priceMin?: number
  priceMax?: number
  search?: string
}

export const Route = createFileRoute('/_layout/products/')({
  component: Products,
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      categories:
        typeof search.categories === 'string' ? search.categories : undefined,
      priceMin:
        typeof search.priceMin === 'number' ? search.priceMin : undefined,
      priceMax:
        typeof search.priceMax === 'number' ? search.priceMax : undefined,
      search: typeof search.search === 'string' ? search.search : undefined
    }
  }
})

function Products() {
  const [isList, setIsList] = useState(false)

  const backNavigation = useNavigate({ from: '/products' })

  const Icon = isList ? icons.List : icons.Grid2x2

  const search = Route.useSearch()

  const filteredProducts = fakeProducts.filter(product => {
    if (search.priceMin) {
      if (product.price < search.priceMin) {
        return false
      }
    }

    if (search.priceMax) {
      if (product.price > search.priceMax) {
        return false
      }
    }
    if (search.search) {
      if (
        !product.name.toLowerCase().includes(search.search.toLowerCase()) &&
        !product.categories.some(category =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          // search.search is not undefined
          category.name.toLowerCase().includes(search.search.toLowerCase())
        )
      ) {
        return false
      }
    }

    if (search.categories) {
      const selectedCategories = search.categories.split(',')
      if (
        !selectedCategories.every(category =>
          product.categories.some(pCategory => pCategory.name === category)
        )
      ) {
        return false
      }
    }

    return true
  })

  return (
    <>
      <div className='sticky top-0 z-10 flex w-full justify-between'>
        <icons.ArrowLeft
          className='left-0 top-0 mt-4 cursor-pointer
          '
          size={24}
          onClick={() => backNavigation({ to: '/' })}
        />
        <Icon
          className='right-0 top-0 mt-4 cursor-pointer
        '
          size={24}
          onClick={() => setIsList(!isList)}
        />
      </div>
      <div className='flex flex-col items-center'>
        <span className='mt-2 text-2xl font-semibold'>Featured Products</span>
        <ProductFilter className='mt-2' />
        {isList ? (
          <ProductTable
            products={filteredProducts}
            className='mx-auto mt-4 w-3/4'
          />
        ) : (
          <ProductCardList
            products={filteredProducts}
            className='mx-auto mt-4  w-2/3'
          />
        )}
      </div>
    </>
  )
}
