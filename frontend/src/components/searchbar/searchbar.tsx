import React, { useState } from 'react'

import { SearchBarModal } from '@/components/searchbar/searchbar-modal'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

function SearchBar() {
  const [searchInput, setSearchInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Input
          placeholder='Search for products...'
          className='w-full'
          value={searchInput}
          onChange={handleInputChange}
        />
      </PopoverTrigger>

      <PopoverContent>
        <SearchBarModal />
      </PopoverContent>
    </Popover>
  )
}

export { SearchBar }
