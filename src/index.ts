import express from "express"
import sessionRoutes from "./routes/sessionRoutes.js"
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use("/api/session", sessionRoutes)

const server = app.listen(PORT, () => {
  console.log("listening on port ", PORT)
});
