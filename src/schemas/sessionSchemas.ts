import z from 'zod'

const userTypes = z.enum(['STUDENT', 'TEACHER'])

export type UserTypes = z.infer<typeof userTypes>

export const registerUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required'
    }).min(1, 'Name must be at least 1 character long').max(20, 'Name must be less than 20 characters long'),
    email: z.string({
      required_error: 'Email is required'
    }).email("Not a valid email"),
    password: z.string({
      required_error: 'Password is required'
    }).min(6, 'Password must be at least 6 characters long').max(100, 'Password must be less than 100 characters long'),
    passwordConfirmation: z.string({
      required_error: 'Password confirmation is required'
    }),
    type: userTypes,
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match'
  })
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>['body']