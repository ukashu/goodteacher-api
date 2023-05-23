import z from 'zod'

//TODO: add regex input validation

export const getStudentsInClassSchema = z.object({
  params: z.object({
    classId: z.string().regex(new RegExp("^[0-9]+$"))
  })
})

export const addStudentToClassSchema = z.object({
  params: z.object({
    classId: z.string().regex(new RegExp("^[0-9]+$"))
  }),
  body: z.object({
    email: z.string().email("Not a valid email"),
    alias: z.string().min(1, "Alias must be at least 1 character long").max(25, "Alias must be at most 25 characters long")
  })
})

export const deleteStudentFromClassSchema = z.object({
  params: z.object({
    classId: z.string().regex(new RegExp("^[0-9]+$")),
    studentId: z.string().regex(new RegExp("^[0-9]+$"))
  })
})

export const acceptInviteToClassSchema = z.object({
  params: z.object({
    classId: z.string().regex(new RegExp("^[0-9]+$")),
    studentId: z.string().regex(new RegExp("^[0-9]+$"))
  })
})

export type GetStudentsInClassInput = z.infer<typeof getStudentsInClassSchema>['params']

export type AddStudentToClassInput = z.infer<typeof addStudentToClassSchema>

export type DeleteStudentFromClassInput = z.infer<typeof deleteStudentFromClassSchema>['params']

export type AcceptInviteToClassInput = z.infer<typeof acceptInviteToClassSchema>['params']