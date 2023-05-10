import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      const foundUser = await prisma.users.findUnique({
        where: {
          id: decoded.id,
        },
      })

      res.locals.user = {
        id: foundUser.id,
        name: foundUser.name,
        accountType: foundUser.type,
      }

      next()
    } catch (error) {
      console.log({error})
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized - no token')
  }
})