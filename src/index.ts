import express from "express"
import sessionRoutes from "./api/sessions/session.routes.js"
import classRoutes from "./api/classes/class.routes.js"
import studentRoutes from "./api/students/student.routes.js"
import taskRoutes from "./api/tasks/task.routes.js"
import errorHandler from "./middleware/errorMiddleware.js"
import 'dotenv/config'
import { rateLimiter } from './middleware/rateLimitMiddleware.js'

const app = express()
const PORT = Number(process.env.PORT) || 5000

app.use(rateLimiter)

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", sessionRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/classes/:classId/students', studentRoutes)
app.use('/api/classes/:classId/students/:studentId/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use(errorHandler)

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log("listening on port ", PORT)
});
