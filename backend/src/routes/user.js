import express from "express"
import {
  createPostWithUserId,
  createCommentWithUserIdAndPostId,
  getAllUsersWithRole,
  getOneUserWithRole,
  getAllPostsByUser,
  changeRole,
  deleteOneUser,
} from "../controllers/user.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/:userId/posts", auth, createPostWithUserId)
router.post(
  "/:userId/posts/:postId/comments",
  auth,
  createCommentWithUserIdAndPostId
)
router.get("/", auth, getAllUsersWithRole)
router.get("/:userId", auth, getOneUserWithRole)
router.get("/:userId/posts", auth, getAllPostsByUser)
router.put("/:userId", auth, changeRole)
router.delete("/:userId", auth, deleteOneUser)

export default router
