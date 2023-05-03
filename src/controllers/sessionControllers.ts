import asyncHandler from 'express-async-handler'

//POST /api/session
//@desc login with google
const login = asyncHandler( async(req, res) => {

  res.status(201).json('user upserted')
})

export { login }