import express from "express"
import {
  createPostWithUserId,
  createCommentWithUserIdAndPostId,
  getAllUsers,
  getOneUser,
  getAllPostsByUser,
  changeRole,
  deleteOneUser,
} from "../controllers/user.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/:userId/create-post", auth, createPostWithUserId)
router.post(
  "/:userId/posts/:postId/create-comment",
  auth,
  createCommentWithUserIdAndPostId
)
router.get("/", auth, getAllUsers)
router.get("/:userId", auth, getOneUser)
router.get("/:userId/posts", auth, getAllPostsByUser)
router.put("/:userId", changeRole)
router.delete("/:userId", auth, deleteOneUser)

export default router
