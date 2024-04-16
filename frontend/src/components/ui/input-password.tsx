import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icons } from '../icons'
import { Button } from './button'
import { Input } from './input'

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const toggleShowPassword = () => setShowPassword(prev => !prev)

    return (
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          className={cn('pr-10', className)}
          {...props}
        />

        <Button
          type='button'
          variant='ghost'
          size='none'
          className='absolute right-1 top-1/2 size-8 -translate-y-1/2'
        >
          {showPassword ? (
            <Icons.eyeOff onClick={toggleShowPassword} className='size-5' />
          ) : (
            <Icons.eye onClick={toggleShowPassword} className='size-5' />
          )}
        </Button>
      </div>
    )
  }
)
InputPassword.displayName = 'InputPassword'

export { InputPassword }
