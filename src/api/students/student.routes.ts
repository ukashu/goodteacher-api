import express from "express"
import { getStudentsInClass, addStudentToClass, removeStudentFromClass, acceptInviteToClass } from "./student.controllers.js"
import validate from "../../middleware/validateMiddleware.js"
import { getStudentsInClassSchema, addStudentToClassSchema, deleteStudentFromClassSchema, acceptInviteToClassSchema } from "./student.schema.js"
import { protect } from "../../middleware/authMiddleware.js"

const router = express.Router({mergeParams: true});

router.route("/")
.get(protect, validate(getStudentsInClassSchema), getStudentsInClass)
.post(protect, validate(addStudentToClassSchema), addStudentToClass)

router.route("/:studentId")
.delete(protect, validate(deleteStudentFromClassSchema), removeStudentFromClass)
.put(protect, validate(acceptInviteToClassSchema), acceptInviteToClass)

export default router
