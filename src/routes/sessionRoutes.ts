import express from "express"
import { login, register } from "../controllers/sessionControllers.js"

const router = express.Router();

router.route("/").post(register);
router.route("/session").post(login)

export default router