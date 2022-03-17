import express from "express"
import { signUp, signIn, modifyAccount } from "../controllers/session.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.put("/:userId", auth, modifyAccount)

export default router
