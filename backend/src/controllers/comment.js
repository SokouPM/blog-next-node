import CommentModel from "../db/models/Comment.js"

export const getOneCommentWithAuthorAndPostAuthor = async (req, res) => {
  const {
    params: { commentId },
  } = req

  const commentWithAuthor = await CommentModel.query()
    .findById(commentId)
    .select(
      "comments.*",
      "users.displayName as author",
      "posts.user_id as postAuthorId"
    )
    .leftJoinRelated("[users, posts]")

  if (!commentWithAuthor) {
    res.status(404).send({ error: "Comment not found" })

    return
  }

  res.status(200).send(commentWithAuthor)
}

export const modifyOneComment = async (req, res) => {
  const {
    params: { commentId },
    body: { content },
  } = req

  const updatedComment = await CommentModel.query().updateAndFetchById(
    commentId,
    {
      content,
    }
  )

  if (!updatedComment) {
    res.status(404).send({ error: "Comment not found" })

    return
  }

  res.status(200).send({ status: "Comment modified" })
}

export const deleteOneComment = async (req, res) => {
  const {
    params: { commentId },
  } = req

  const company = await CommentModel.query().findById(commentId)

  if (!company) {
    res.status(404).send({ error: "Comment not found" })

    return
  }

  await CommentModel.query().delete().where({ id: commentId })

  res.status(200).send({ status: "Comment deleted" })
}
