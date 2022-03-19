import PostModel from "../db/models/Post.js"

export const getAllPostsWithAuthor = async (req, res) => {
  const postsWithAuthor = await PostModel.query()
    .select("posts.*", "users.displayName as author")
    .leftJoinRelated("users")
    .orderBy("createdAt", "desc")

  res.status(200).send(postsWithAuthor)
}

export const getOnePostWithAuthor = async (req, res) => {
  const {
    params: { postId },
  } = req

  const postWithAuthor = await PostModel.query()
    .findById(postId)
    .select("posts.*", "users.displayName as author")
    .leftJoinRelated("users")

  if (!postWithAuthor) {
    res.status(404).send({ error: "Post not found" })

    return
  }

  res.status(200).send(postWithAuthor)
}

export const getAllCommentsByPostWithAutor = async (req, res) => {
  const {
    params: { postId },
  } = req

  const posts = await PostModel.query().findById(postId)

  if (!posts) {
    res.status(404).send({ error: "Post not found" })

    return
  }

  const comments = await posts
    .$relatedQuery("comments")
    .select("comments.*", "users.displayName as author")
    .leftJoinRelated("users")
    .orderBy("createdAt", "desc")

  res.status(200).send(comments)
}

export const modifyOnePost = async (req, res) => {
  const {
    params: { postId },
    body: { title, content },
  } = req

  const updatedPost = await PostModel.query().updateAndFetchById(postId, {
    title,
    content,
  })

  if (!updatedPost) {
    res.status(404).send({ error: "Post not found" })

    return
  }

  res.status(200).send({ status: "Post modified" })
}

export const deleteOnePost = async (req, res) => {
  const {
    params: { postId },
  } = req

  const company = await PostModel.query().findById(postId)

  if (!company) {
    res.status(404).send({ error: "Post not found" })

    return
  }

  await PostModel.query().delete().where({ id: postId })

  res.status(200).send({ status: "Post deleted" })
}
