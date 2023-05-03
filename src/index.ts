import express from "express"
import sessionRoutes from "./routes/sessionRoutes.js"
import errorHandler from "./middleware/errorMiddleware.js"
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", sessionRoutes)

app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log("listening on port ", PORT)
});
