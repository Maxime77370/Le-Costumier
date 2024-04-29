import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { fakeCategories } from '@/fakeData'
import { CategoryBadge } from '../categories/category-badge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'

type ProductFilterProps = {
  className?: string
}

export type selectedCategoriesType = {
  [key: string]: boolean
}

function ProductFilter({ className }: ProductFilterProps) {
  const routeApi = getRouteApi('/_layout/products/')
  const routeSearch = routeApi.useSearch()

  const [selectedCategories, setSelectedCategories] =
    useState<selectedCategoriesType>(
      fakeCategories.reduce((acc, category) => {
        acc[category.name] =
          routeSearch.categories?.includes(category.name) || false
        return acc
      }, {} as selectedCategoriesType)
    )

  const categoriesName =
    Object.keys(selectedCategories)
      .filter(category => selectedCategories[category])
      .join(',') || undefined

  const selectedCategoriesCount = Object.keys(selectedCategories).filter(
    category => selectedCategories[category]
  ).length

  const [price, setPrice] = useState<[number, number]>([
    routeSearch.priceMin || 0,
    routeSearch.priceMax || 500
  ])

  const [search, setSearch] = useState(routeSearch.search || '')

  const navigate = useNavigate({
    from: '/products/$productId'
  })

  const handleButtonSearch = () => {
    navigate({
      to: '/products',
      search: {
        categories: categoriesName,
        priceMin: price[0] === 0 ? undefined : price[0],
        priceMax: price[1] === 500 ? undefined : price[1],
        search: search === '' ? undefined : search
      }
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <form
      onSubmit={e => (e.preventDefault(), handleButtonSearch())}
      className={`${className || ''} z-10 flex items-center`}
    >
      <Popover>
        <PopoverTrigger>
          <Button>
            Categories{' '}
            {selectedCategoriesCount !== 0 && `${selectedCategoriesCount}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Card className='flex w-96 flex-wrap justify-center gap-2 p-2'>
            {fakeCategories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategories({
                    ...selectedCategories,
                    [category.name]: !selectedCategories[category.name]
                  })
                }}
              >
                <CategoryBadge
                  key={category.id}
                  category={category}
                  className={
                    selectedCategories[category.name]
                      ? ' scale-125 transition duration-300 ease-in-out'
                      : ''
                  }
                />
              </button>
            ))}
          </Card>
        </PopoverContent>
      </Popover>
      <div className='ml-4' />
      <Popover>
        <PopoverTrigger>
          <Button>Price</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Card className='flex w-64 flex-col items-center py-2'>
            <div className='w-full p-2'>
              <Slider
                step={1}
                min={0}
                max={500}
                value={price}
                onValueChange={value => setPrice(value as [number, number])}
              />
            </div>
            <div className='flex w-full justify-between px-2'>
              <Input
                type='number'
                value={price[0]}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice([
                    e.target.value !== ''
                      ? parseInt(e.target.value)
                      : routeSearch.priceMin || 0,
                    price[1]
                  ])
                }
              />
              <Input
                type='number'
                value={price[1]}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice([
                    price[0],
                    e.target.value !== ''
                      ? parseInt(e.target.value)
                      : routeSearch.priceMax || 500
                  ])
                }
              />
            </div>
          </Card>
        </PopoverContent>
      </Popover>
      <div className='ml-4' />
      <Input
        defaultValue={routeSearch.search || ''}
        placeholder='Search'
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        id='product-filter-search'
        type='search'
      />
      <div className='ml-4' />
      <Button color='primary' className='w-64' type='submit'>
        Search
      </Button>
    </form>
  )
}

export { ProductFilter }
