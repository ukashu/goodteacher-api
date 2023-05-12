import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ResLocalsUser } from '../../util/types.js'
import { GetTasksInput, CreateTaskInput, DeleteTaskInput, CompleteTaskInput } from './task.schema.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//@route GET /api/classes/:classId/students/:studentId/tasks
//@desc get all tasks for a student in a class
//@access private/teacher || private/student
export const getTasks = asyncHandler(async (req: Request<GetTasksInput>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe
  const classId = Number(req.params.classId)
  const studentId = Number(req.params.studentId)

  //return error if user is a teacher and is not the owner of the class//return error if user is not the owner of the class or if class does not exist
  const queriedClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
  })
  if (!queriedClass || (user.accountType === 'TEACHER' && queriedClass.user_id != user.id)) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //return error if user is a student and is not the student from the params
  if (user.accountType === 'STUDENT' && user.id != studentId) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //query the db for all tasks for the student in the class (find tasks by user_id and class_id)
  const tasks = await prisma.tasks.findMany({
    where: {
      user_id: studentId,
      class_id: classId,
    },
  })

  //TODO: what happens if student has no tasks?
  //TODO: what happens if student is not in class?

  //return tasks + success message
  res.status(200).json({message: 'Query successful', tasks})

})

//@route POST /api/classes/:classId/students/:studentId/tasks
//@desc create a new task for a student in a class
//@access private/teacher || private/student
export const createTask = asyncHandler(async (req: Request<CreateTaskInput["params"], {}, CreateTaskInput["body"]>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe
  const classId = Number(req.params.classId)
  const studentId = Number(req.params.studentId)
  const body = req.body

  //return error if user is teacher and not the owner of the class or if class does not exist
  const queriedClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
  })
  if (!queriedClass || (user.accountType === 'TEACHER' && queriedClass.user_id != user.id)) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //return error if user is a student and is not the student from the params
  if (user.accountType === 'STUDENT' && user.id != studentId) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //query users_classes table to see if student is in class
  const queriedStudent = await prisma.users_classes.findUnique({
    where: {
      user_id_class_id: { // TODO: check if this works
        user_id: studentId,
        class_id: classId,
      },
    },
  })

  //if student is not in class, return error
  if (!queriedStudent) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //if student did not accept the invite, return error
  if (!queriedStudent.joined) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //create a new task in the db
  const newTask = await prisma.tasks.create({
    data: {
      content: body.content,
      user_id: studentId,
      class_id: classId,
    },
  })

  //return task + success message
  res.status(201).json({message: 'Task created', task: newTask})
  
})

//@route PUT /api/classes/:classId/students/:studentId/tasks/:taskId
//@desc change tasks status to completed
//@access private/teacher || private/student
export const completeTask = asyncHandler(async (req: Request<CompleteTaskInput>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe
  const classId = Number(req.params.classId)
  const studentId = Number(req.params.studentId)
  const taskId = Number(req.params.taskId)

  //return error if user is a teacher and is not the owner of the class

  //return error if user is a student and is not the student from the params

  //get users_classes_id for the student in the class

  //if student is not in class, return error

  //update (find with user_id and class_id and task_id) tasks status to completed in db

  //return task + success message

  //TODO: what response do i get?
  //TODO: what happens if task is already completed?

})

//@route DELETE /api/classes/:classId/students/:studentId/tasks/:taskId
//@desc delete a task for a student in a class
//@access private/teacher
export const deleteTask = asyncHandler(async (req: Request<DeleteTaskInput>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe
  const classId = Number(req.params.classId)
  const studentId = Number(req.params.studentId)
  const taskId = Number(req.params.taskId)

  //return error if user is not a teacher

  //return error if user is a teacher and is not the owner of the class

  //get users_classes_id for the student in the class

  //if student is not in class, return error

  //delete task from db (find with users_classes_id and task_id)

  //return success message

})