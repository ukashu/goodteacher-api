import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import { RegisterUserInput, LoginUserInput } from './session.schema.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
  service: 'Outlook365', // or 'hotmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//TODO: Database error messages are too descriptive

//POST /api/users
//@desc register
const register = asyncHandler( async(req: Request<{}, {}, RegisterUserInput>, res: Response) => {
  const body = req.body

  //Check if user exists
  const userExists = await prisma.users.findUnique({
    where: {
      email: body.email
    }
  })

  //if userexists and isnt activated - resend confirmation email
  if (userExists && !userExists.activated) {
    const transport = await sendConfirmationEmail(userExists.id, userExists.email)

    if (transport) {
      res.status(201).json({ message: "User already exists, confirmation email resent"})
      return
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  }

  if (userExists) {
    throw new Error('User already exists')
  }

  //Generate password hash
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(body.password, salt)

  //Add user to database
  const user = await prisma.users.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      type: body.type,
    }
  })

  //If user was added successfully, send confirmation email
  if (user) {

    const transport = await sendConfirmationEmail(user.id, user.email)
    //TODO: on mailing error delete user from database 
    //OR if user is not activated for 24 hours delete user from database 
    //OR if user is not activated resend confirmation email on register

    if (transport) {
      res.status(201).json({ message: "User created, we sent you an email with a link to activate your account"})
    }
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//POST /api/users/session
//@desc login
const login = asyncHandler( async(req: Request<{}, {}, LoginUserInput>, res: Response) => {
  const body = req.body

  //Find user in database
  const user = await prisma.users.findUnique({
    where: {
      email: body.email
    }
  })

  //Check if user exists and is activated
  if (!user) {
    res.status(401)
    throw new Error('Invalid credentials')
  }
  if (user.activated === false) {
    res.status(401)
    throw new Error('Confirm your email address')
  }

  //Compare password hashes
  //Comparison seems dangerous TODO: check if it's safe
  if (user && (await bcrypt.compare(body.password, user.password))) {
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        accountType: user.type,
        token: generateToken(user.id)
    })
  } else {
      res.status(401)
      throw new Error('Invalid credentials')
  }
})

const confirmEmail = asyncHandler( async(req, res) => {
  const { emailToken } = req.params

  const decoded = jwt.verify(emailToken, process.env.EMAIL_SECRET)

  //modify users activated field to true
  const activation = await prisma.users.update({
    where: {
      id: decoded.id
    },
    data: {
      activated: true
    }
  })

  if (activation.activated) {
    res.status(200).json({ message: "Email confirmed"})
  }
})

// Generate JSON Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
  })
}

const sendConfirmationEmail = async(id: number, email: string) => {
  const emailToken = jwt.sign({ id }, process.env.EMAIL_SECRET, {
    expiresIn: '30d',
  })
  const url = `http://localhost:5000/api/users/confirmation/${emailToken}`

  //Send email
  const transport = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirm Email',
    html: `<html><body><p>Please click this link to confirm your email: </p><a href="${url}">${url}</a></body></html>`,
  })

  return transport
}

export { login, register, confirmEmail }