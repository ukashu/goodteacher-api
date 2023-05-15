import express from "express"
import validate from "../../middleware/validateMiddleware.js"
import { protect } from "../../middleware/authMiddleware.js"
import { getTasks, createTask, completeTask, deleteTask } from "./task.controllers.js"
import { getTasksSchema, createTaskSchema, completeTaskSchema, deleteTaskSchema } from "./task.schema.js"

const router = express.Router({mergeParams: true});

router.route("/")
.get(protect, validate(getTasksSchema), getTasks)
.post(protect, validate(createTaskSchema), createTask)
router.route("/:taskId")
.put(protect, validate(completeTaskSchema), completeTask)
.delete(protect, validate(deleteTaskSchema), deleteTask)

export default router
