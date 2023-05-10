import express from "express"
import sessionRoutes from "./api/sessions/session.routes.js"
import errorHandler from "./middleware/errorMiddleware.js"
import 'dotenv/config'

const app = express()
const PORT = Number(process.env.PORT) || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", sessionRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use(errorHandler)

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log("listening on port ", PORT)
});
