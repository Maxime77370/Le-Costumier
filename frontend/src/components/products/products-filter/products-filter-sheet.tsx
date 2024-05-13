import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { getCategories } from '@/api/categories'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Icons } from '../../icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../ui/accordion'
import { Button } from '../../ui/button'
import { Checkbox } from '../../ui/checkbox'
import { Label } from '../../ui/label'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../ui/sheet'

type ProductFilterProps = {
  className?: string
}

interface SheetFilters {
  categories: string[]
  price: {
    min: number
    max: number
  }
}

function ProductsFilterSheet({ className }: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const router = useRouter()
  const search = useSearch({
    from: '/_layout/products/'
  })

  const [filters, setFilters] = useState<SheetFilters>({
    categories: search.categories?.split(',') ?? [],
    price: {
      min: search.minPrice ?? 0,
      max: search.maxPrice ?? 1_000
    }
  })

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    select: res => res.data
  })

  const handleApply = () => {
    router.navigate({
      search: {
        ...search,
        categories: filters.categories.length
          ? filters.categories.join(',')
          : undefined,
        minPrice: filters.price.min > 0 ? filters.price.min : undefined,
        maxPrice: filters.price.max < 1_000 ? filters.price.max : undefined
      }
    })
    setIsOpen(false)
  }

  const handleReset = () => {
    setFilters({
      categories: [],
      price: {
        min: 0,
        max: 1_000
      }
    })

    router.navigate({
      search: {
        ...search,
        name: undefined,
        categories: undefined,
        minPrice: undefined,
        maxPrice: undefined
      }
    })
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' className={cn('gap-x-2', className)}>
          <Icons.filter className='size-4' />
          <span>Filter</span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>

        <Accordion type='multiple'>
          <AccordionItem value='categories'>
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              {isLoading || !categories ? (
                <div>Loading...</div>
              ) : (
                <div className='grid grid-cols-2 gap-2'>
                  {categories.map(category => (
                    <div
                      key={category.id}
                      className='flex items-center gap-x-2'
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={filters.categories.some(
                          cat => cat === category.name
                        )}
                        onCheckedChange={checked => {
                          setFilters(prev => ({
                            ...prev,
                            categories: checked
                              ? [...prev.categories, category.name]
                              : prev.categories.filter(
                                  cat => cat !== category.name
                                )
                          }))
                        }}
                      />
                      <Label htmlFor={`category-${category.id}`}>
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='price'>
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent>
              <div className='mb-2 flex items-center justify-between'>
                <span>
                  {filters.price.min.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                  })}
                </span>
                <span>
                  {filters.price.max.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                  })}
                </span>
              </div>

              <Slider
                min={0}
                max={1_000}
                step={1}
                value={[filters.price.min, filters.price.max]}
                onValueChange={value =>
                  setFilters(prev => ({
                    ...prev,
                    price: {
                      min: value[0],
                      max: value[1]
                    }
                  }))
                }
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SheetFooter className='mt-4'>
          <Button variant='outline' onClick={handleReset}>
            Reset
          </Button>

          <Button onClick={handleApply}>Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { ProductsFilterSheet }
