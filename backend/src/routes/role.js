import express from "express"
import { getAllRoles, getOneRole } from "../controllers/role.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", auth, getAllRoles)
router.get("/:roleId", auth, getOneRole)

export default router
