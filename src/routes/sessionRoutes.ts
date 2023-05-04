import express from "express"
import { login, register, confirmEmail } from "../controllers/sessionControllers.js"

const router = express.Router();

router.route("/").post(register);
router.route("/session").post(login)
router.route('/confirmation/:emailToken').get(confirmEmail)

export default router