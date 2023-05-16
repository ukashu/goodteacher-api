const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  //handle zod errors
  if (err.name === 'ZodError') {
    res.status(404)
    res.json({
      error: true,
      message: err.issues[0].message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
  } else {
    res.json({
      error: true,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
  }
}

export default errorHandler