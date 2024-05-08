import { useQueries } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import { getProducts } from '@/api/products'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Icons } from '../icons'
import { Button } from '../ui/button'

type SearchBarProps = {
  className?: string
}

function SearchBar({ className }: SearchBarProps) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const setValueDebounced = useDebounceCallback(setValue, 300)

  const { products, isLoading } = useQueries({
    queries: [
      {
        queryKey: ['products', { search: { name: value } }],
        queryFn: () => getProducts({ name: value }),
        enabled: value.length > 0
      }
    ],
    combine: res => {
      const products = res[0]

      const isLoading = products.isLoading

      return {
        isLoading,
        products: products.data?.data
      }
    }
  })

  useEffect(() => {
    if (isOpen) {
      setValue('')
    }
  }, [isOpen])

  return (
    <>
      <Button
        variant='outline'
        className={cn('text-muted-foreground', className)}
        onClick={() => setIsOpen(true)}
      >
        {window.innerWidth <= 768 ? 'Search' : 'Search for products...'}
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder='Type your search...'
          onValueChange={setValueDebounced}
        />
        <CommandList>
          {isLoading ? (
            <CommandLoading className='flex justify-center'>
              <Icons.spinner className='size-6 animate-spin' />
            </CommandLoading>
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {products && (
            <CommandGroup heading='Products'>
              {products.map(product => (
                <CommandItem
                  key={product.id}
                  value={product.name}
                  onSelect={() => {
                    router.navigate({
                      to: `/products/$productId`,
                      params: { productId: product.id.toString() }
                    })
                    setIsOpen(false)
                  }}
                >
                  <Link
                    to='/products/$productId'
                    params={{ productId: product.id.toString() }}
                    onClick={() => setIsOpen(false)}
                  >
                    {product.name}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export { SearchBar }
