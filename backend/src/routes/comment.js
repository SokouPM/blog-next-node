import express from "express"
import {
  getOneCommentWithAuthor,
  modifyOneComment,
  deleteOneComment,
} from "../controllers/comment.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/:commentId", auth, getOneCommentWithAuthor)
router.put("/:commentId", auth, modifyOneComment)
router.delete("/:commentId", auth, deleteOneComment)

export default router
