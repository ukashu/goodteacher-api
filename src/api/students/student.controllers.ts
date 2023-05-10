import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

//@route GET /api/classes/:classId/students
//@desc get all students in a class
//@access private/teacher

//@route POST /api/classes/:classId/students
//@desc add a student to a class
//@access private/teacher

//@route PUT /api/classes/:classId/students/:studentId
//@desc accept invite to a class
//@access private/student

//@route DELETE /api/classes/:classId/students/:studentId
//@desc remove a student from a class
//@access private/teacher || private/student