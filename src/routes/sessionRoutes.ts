import express from "express"
import { login, register, confirmEmail } from "../controllers/sessionControllers.js"
import validate from "../middleware/validateMiddleware.js"
import { registerUserSchema, loginUserSchema } from "../schemas/sessionSchemas.js"

const router = express.Router();

router.route("/").post(validate(registerUserSchema), register);
router.route("/session").post(validate(loginUserSchema), login)
router.route('/confirmation/:emailToken').get(confirmEmail)

export default router