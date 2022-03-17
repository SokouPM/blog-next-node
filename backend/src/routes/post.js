import express from "express"
import {
  getAllPostsWithAuthor,
  getOnePostWithAuthor,
  getAllCommentsByPostWithAutor,
  modifyOnePost,
  deleteOnePost,
} from "../controllers/post.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAllPostsWithAuthor)
router.get("/:postId", auth, getOnePostWithAuthor)
router.get("/:postId/comments", auth, getAllCommentsByPostWithAutor)
router.put("/:postId", auth, modifyOnePost)
router.delete("/:postId", auth, deleteOnePost)

export default router
