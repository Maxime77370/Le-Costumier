import { useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { router } from '@/router'
import { ProductsFilterSheet } from './products-filter-sheet'

interface ProductsFilterProps {
  className?: string
}

function ProductsFilter({ className }: ProductsFilterProps) {
  const search = useSearch({
    from: '/_layout/products/'
  })

  const [name, setName] = useState<string>(search.name ?? '')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.navigate({
      search: {
        ...search,
        name: name.length ? name : undefined
      }
    })
  }

  return (
    <div className={cn('flex items-center gap-x-2', className)}>
      <ProductsFilterSheet />

      <form
        onSubmit={handleSearch}
        className='flex flex-1 items-center gap-x-2'
      >
        <Input
          placeholder='Search by name...'
          className='flex-1'
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Button size='icon' className='shrink-0'>
          <Icons.search className='size-4' />
        </Button>
      </form>
    </div>
  )
}

export { ProductsFilter }
