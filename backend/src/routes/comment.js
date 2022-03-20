import express from "express"
import {
  getOneCommentWithAuthorAndPostAuthor,
  modifyOneComment,
  deleteOneComment,
} from "../controllers/comment.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/:commentId", auth, getOneCommentWithAuthorAndPostAuthor)
router.put("/:commentId", auth, modifyOneComment)
router.delete("/:commentId", auth, deleteOneComment)

export default router
