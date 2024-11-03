// following dependencies are needed ->     "@hookform/resolvers": "^3.9.1", "zod": "^3.23.8", "react-hook-form": "^7.53.1

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const baseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
})

const schema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
)

type FormValues = z.infer<typeof schema>

function CustomForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  const fields = Object.keys(baseSchema.shape) as Array<keyof FormValues>

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='form-container'
    >
      {fields.map((key) => (
        <div
          className='form-group'
          key={key}
        >
          <label htmlFor={key}>{key}</label>
          <Controller
            render={({ field }) => (
              <input
                {...field}
                className={`form-input ${errors[key] ? 'isError' : ''}`}
              />
            )}
            name={key}
            control={control}
          />
          {errors[key] && <p className='form-error'>{errors[key].message}</p>}
        </div>
      ))}
      <button type='submit'>Submit</button>
    </form>
  )
}

export default CustomForm
