import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { InputPassword } from '../ui/input-password'

const schema = z.object({
  lastName: z.string().min(1, 'Last name is required'),
  firstName: z.string().min(1, 'First name is required'),
  login: z.string().min(3, 'Login must be at least 3 characters long'),
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
})

type SchemaType = z.infer<typeof schema>

type RegisterFormProps = {
  className?: string
}

function RegisterForm({ className }: RegisterFormProps) {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      lastName: '',
      firstName: '',
      login: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: SchemaType) => {
    // Register call API
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-y-2', className)}
      >
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Doe' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='John' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input {...field} placeholder='johndoe' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  placeholder='john.doe@email.com'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword
                  {...field}
                  placeholder='Your very ultra secret password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-2 w-full'>
          Register
        </Button>
      </form>
    </Form>
  )
}

export { RegisterForm }
