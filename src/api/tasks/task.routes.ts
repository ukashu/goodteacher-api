import express from "express"
import validate from "../../middleware/validateMiddleware.js"
import { protect } from "../../middleware/authMiddleware.js"
import { getTasks, createTask } from "./task.controllers.js"
import { getTasksSchema, createTaskSchema } from "./task.schema.js"

const router = express.Router({mergeParams: true});

router.route("/")
.get(protect, validate(getTasksSchema), getTasks)
.post(protect, validate(createTaskSchema), createTask)

export default router
