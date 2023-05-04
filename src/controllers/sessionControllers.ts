import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//TODO: Database error messages are too descriptive

//POST /api/users
//@desc register
const register = asyncHandler( async(req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Missing data')
  }

  //Check if user exists
  const userExists = await prisma.users.findUnique({
    where: {
      email
    }
  })
  if (userExists) {
    throw new Error('User already exists')
  }

  //Generate password hash
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Add user to database
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })
  
  //If user was added successfully, return user data and token
  if (user) {
    res.status(201).json({ message: "user created"})
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//POST /api/users/session
//@desc login
const login = asyncHandler( async(req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Missing data')
  }

  //Find user in database
  const user = await prisma.users.findUnique({
    where: {
      email
    }
  })

  //Check if user exists and is activated
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  if (user.activated === false) {
    res.status(401)
    throw new Error('Confirm your email address')
  }

  //Compare password hashes
  //Comparison seems dangerous TODO: check if it's safe
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
    })
  } else {
      res.status(401)
      throw new Error('Invalid credentials')
  }
})

// Generate JSON Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
  })
}

export { login, register }