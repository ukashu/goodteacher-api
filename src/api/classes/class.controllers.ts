import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { CreateClassInput, DeleteClassInput } from './class.schema.js'
import { ResLocalsUser } from '../../util/types.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//@route GET /api/classes
//@desc get all classes related to user
//@access private/teacher || private/student
export const getMyClasses = asyncHandler(async (req: Request, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe

  //if user is a teacher get all classes from classes table
  if (user.accountType == 'TEACHER') {
    const myClasses = await prisma.classes.findMany({
      where: {
        user_id: user.id,
      },
    })

    //TODO: what happens if user is a teacher but has no classes?

    res.status(200).json({message: 'Query successful', myClasses})

  } else if (user.accountType == 'STUDENT') {
  //else if user is a student get all classes from users_classes table
    const myClasses = await prisma.users_classes.findMany({
      where: {
        user_id: user.id,
      },
    })

    res.status(200).json({message: 'Query successful', myClasses, accountType: user.accountType})

  } else {
    //return error if user is not a teacher or student
    res.status(401)
    throw new Error('Not authorized')
  }
})

//@route POST /api/classes
//@desc create a new class for user
//@access private/teacher
export const createClass = asyncHandler(async (req: Request<{}, {}, CreateClassInput>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe

  //destructure class data from req.body
  const body = req.body

  //return error if user is not a teacher
  if (user.accountType != 'TEACHER') {
    res.status(401)
    throw new Error('Not authorized')
  }

  //create a new class in classes table
  const newClass = await prisma.classes.create({
    data: {
      name: body.name,
      user_id: user.id,
    },
  })

  //return the new class
  res.status(201).json({message: 'Class created', newClass})
})

//@route DELETE /api/classes/:classId
//@desc delete a class
//@access private/teacher
export const deleteClass = asyncHandler(async (req: Request<DeleteClassInput>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe

  //get class id from req.params
  const classId = Number(req.params.classId)

  //throw error if users id doesn't match the class owners user id or if class doesn't exist
  const myClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
  })
  if (!myClass || myClass.user_id != user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //return error if user is not a teacher
  if (user.accountType != 'TEACHER') {
    res.status(401)
    throw new Error('Not authorized')
  }

  //delete class from classes table
  const deletedClass = await prisma.classes.delete({
    where: {
      id: classId,
    },
  })

  res.status(200).json({message: 'Class deleted', deletedClass})
})