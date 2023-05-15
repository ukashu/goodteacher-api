import z from 'zod'

//TODO: add regex input validation

const boolTypes = z.enum(['true', 'false'])

export const getTasksSchema = z.object({
  params: z.object({
    classId: z.string().regex(new RegExp("^[0-9]+$")),
    studentId: z.string().regex(new RegExp("^[0-9]+$"))
  })
})

export const createTaskSchema = z.object({
  params: z.object({
    classId: z.string().regex(new RegExp("^[0-9]+$")),
    studentId: z.string().regex(new RegExp("^[0-9]+$"))
  }),
  body: z.object({
    content: z.string().min(1, "Alias must be at least 1 character long").max(140, "Alias must be at most 25 characters long")
  })
})

export const completeTaskSchema = z.object({
  params: z.object({
    classId: z.string().regex(new RegExp("^[0-9]+$")),
    studentId: z.string().regex(new RegExp("^[0-9]+$")),
    taskId: z.string().regex(new RegExp("^[0-9]+$"))
  }),
  body: z.object({
    completed: boolTypes
  })
})

export const deleteTaskSchema = z.object({
  params: z.object({
    classId: z.string().regex(new RegExp("^[0-9]+$")),
    studentId: z.string().regex(new RegExp("^[0-9]+$")),
    taskId: z.string().regex(new RegExp("^[0-9]+$"))
  })
})

export type GetTasksInput = z.infer<typeof getTasksSchema>["params"]

export type CreateTaskInput = z.infer<typeof createTaskSchema>

export type CompleteTaskInput = z.infer<typeof completeTaskSchema>

export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>["params"]