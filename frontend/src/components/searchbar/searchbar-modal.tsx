import { useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

import { CategoryNameIcon } from '@/components/categories/category-name-icon'
import { ProductCategoriesBadge } from '@/components/products/product-categories-badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { fakeCategories, fakeProducts } from '@/fakeData'

type SearchBarModalProps = {
  className?: string
}

function SearchBarModal({ className }: SearchBarModalProps) {
  const [searchInput, setSearchInput] = useState('')
  const productNavigate = useNavigate({ from: '/products/$productId' })

  const filteredCategories = fakeCategories.filter(category =>
    category.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  const filteredProducts = fakeProducts.filter(
    product =>
      product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.categories.some(category =>
        category.name.toLowerCase().includes(searchInput.toLowerCase())
      )
  )

  console.log(filteredProducts)

  const handleSearch = (query: string) => {
    setSearchInput(query)
  }

  const handleProductClick = (productId: string) => {
    productNavigate({
      to: `/products/$productId`,
      params: { productId }
    })
  }

  return (
    <Command className={className}>
      <CommandInput
        placeholder='Type a command or search...'
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
      />
      <CommandList className=' flex w-full flex-col'>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Category'>
          {filteredCategories.slice(0, 3).map(category => (
            <CommandItem key={category.id} value={category.name}>
              <CategoryNameIcon category={category} />
            </CommandItem>
          ))}
          {filteredCategories.length > 3 && (
            <CommandItem
              value={`+ ${filteredCategories.length - 3} more`}
              key={filteredCategories.length}
            >
              + {filteredCategories.length - 3}
            </CommandItem>
          )}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Product'>
          {filteredProducts.slice(0, 3).map(product => (
            <CommandItem
              key={product.id}
              value={
                product.name +
                product.categories.map(category => category.name).join(' ')
              }
              onSelect={() => handleProductClick(product.id)}
            >
              {product.name}
              <ProductCategoriesBadge product={product} className='ml-2' />
            </CommandItem>
          ))}
          {filteredProducts.length > 3 && (
            <CommandItem
              value={`+ ${filteredProducts.length - 3} more`}
              key={filteredProducts.length}
            >
              + {filteredProducts.length - 3}
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export { SearchBarModal }
