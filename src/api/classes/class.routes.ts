import express from "express"
import { getMyClasses, createClass, deleteClass } from "./class.controllers.js"
import validate from "../../middleware/validateMiddleware.js"
import { createClassSchema, deleteClassSchema } from "./class.schema.js"
import { protect } from "../../middleware/authMiddleware.js"

const router = express.Router();

router.route("/").get(protect, getMyClasses).post(protect, validate(createClassSchema), createClass);
router.route("/:classId").delete(protect, validate(deleteClassSchema), deleteClass)

export default router
