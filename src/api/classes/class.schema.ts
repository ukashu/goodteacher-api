import z from 'zod'

//TODO: add regex input validation

export const createClassSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required'
    }).min(1, 'Name must be at least 1 character long').max(25, 'Name must be less than 25 characters long'),
  })
})

export const deleteClassSchema = z.object({
  params: z.object({
    classId: z.string().regex(new RegExp("^[0-9]+$"))
  })
})

export type CreateClassInput = z.infer<typeof createClassSchema>['body']

export type DeleteClassInput = z.infer<typeof deleteClassSchema>['params']