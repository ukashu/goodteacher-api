import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { GetStudentsInClassInput, AddStudentToClassInput, DeleteStudentFromClassInput, AcceptInviteToClassInput } from './student.schema.js'
import { ResLocalsUser } from '../../util/types.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//@route GET /api/classes/:classId/students
//@desc get all students in a class
//@access private/teacher
export const getStudentsInClass = asyncHandler(async (req: Request<GetStudentsInClassInput>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe

  //destructure classId from req.params
  const classId = Number(req.params.classId)

  //return error if user is not a teacher
  if (user.accountType != 'TEACHER') {
    res.status(401)
    throw new Error('Not authorized')
  }

  //return error if user is not the owner of the class
  const queriedClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
  })

  if (queriedClass.user_id != user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //get all students in class from users_classes table
  const studentsInClass = await prisma.users_classes.findMany({
    where: {
      class_id: classId,
    },
  })

  //TODO: what happens if class has no students?
  //TODO: what happens if class does not exist?
  //TODO: return only important data

  res.status(200).json({message: 'Query successful', classId, studentsInClass})
})

//@route POST /api/classes/:classId/students
//@desc add a student to a class
//@access private/teacher
export const addStudentToClass = asyncHandler(async (req: Request<AddStudentToClassInput['params'], {}, AddStudentToClassInput['body']>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe

  //destructure classId from req.params
  const classId = Number(req.params.classId)

  const body = req.body

  //return error if user is not a teacher
  if (user.accountType != 'TEACHER') {
    res.status(401)
    throw new Error('Not authorized')
  }

  //return error if class does not exist or user is not the owner of the class
  const queriedClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
  })

  if (!queriedClass || queriedClass.user_id != user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //return error if user with that email does not exist or its userType is not STUDENT
  const student = await prisma.users.findUnique({
    where: {
      email: body.studentEmail,
    },
  })

  if (!student || student.type != 'STUDENT') {
    res.status(400)
    throw new Error('Invalid')
  }

  //return error if user is already in the class
  const userInClass = await prisma.users_classes.findFirst({
    where: {
      user_id: student.id,
      class_id: classId,
    },
  })

  if (userInClass) { 
    res.status(400)
    throw new Error('Student is already in the class')
  }

  //add user to class in users_classes table
  const addedStudent = await prisma.users_classes.create({
    data: {
      user_id: student.id,
      class_id: classId,
      user_alias: body.studentAlias,
    },
  })

  //TODO: less descriptive error messages

  //return success message
  res.status(200).json({message: 'Student added to class', addedStudent})
})

//@route PUT /api/classes/:classId/students/:studentId
//@desc accept invite to a class
//@access private/student
export const acceptInviteToClass = asyncHandler(async (req: Request<AcceptInviteToClassInput>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe

  const classId = Number(req.params.classId)
  const studentId = Number(req.params.studentId)

  //if user is a teacher return error
  if (user.accountType === 'TEACHER') {
    res.status(401)
    throw new Error('Not authorized')
  }

  //if user is a student and user id does not match student id error
  if (user.id != studentId) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //change joined status of user in users_classes table to true
  const updateStudent = await prisma.users_classes.updateMany({
    where: {
      user_id: studentId,
      class_id: classId,
    },
    data: {
      joined: true,
    }
  })

  if (updateStudent.count === 0) {
    res.status(400)
    throw new Error('Invalid')
  }

  //return success message
  res.status(200).json({message: 'Student joined class', updateStudent})
})

//@route DELETE /api/classes/:classId/students/:studentId
//@desc remove a student from a class
//@access private/teacher || private/student
export const removeStudentFromClass = asyncHandler(async (req: Request<DeleteStudentFromClassInput>, res: Response<{}, {user: ResLocalsUser}>) => {
  const user = res.locals.user //TODO: check if this is safe

  const classId = Number(req.params.classId)
  const studentId = Number(req.params.studentId)

  //return error if user is not the owner of the class or if class does not exist
  const queriedClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
  })
  if (!queriedClass || (user.accountType === 'TEACHER' && queriedClass.user_id != user.id)) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //if user is a student and user id does not match student id error
  if (user.accountType === 'STUDENT' && user.id != studentId) {
    res.status(401)
    throw new Error('Not authorized')
  }

  //remove student from class in users_classes table
  const removedStudent = await prisma.users_classes.deleteMany({
    where: {
      user_id: studentId,
      class_id: classId
    }
  })

  if (removedStudent.count === 0) {
    res.status(400)
    throw new Error('Student is not in the class')
  }

  //return success message
  res.status(200).json({message: 'Student removed from class', removedStudent})
})