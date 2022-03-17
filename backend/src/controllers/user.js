import UserModel from "../db/models/User.js"

export const createPostWithUserId = async (req, res) => {
  const {
    params: { userId },
    body: { title, content },
  } = req

  const user = await UserModel.query().findById(userId)

  if (!user) {
    res.status(404).send({ error: "User not found" })

    return
  }

  await user.$relatedQuery("posts").insert({
    title,
    content,
    user_id: userId,
    publicationDate: new Date().toISOString(),
  })

  res.status(201).send({ status: "Post created" })
}

export const createCommentWithUserIdAndPostId = async (req, res) => {
  const {
    params: { userId, postId },
    body: { content },
  } = req

  const user = await UserModel.query().findById(userId)

  if (!user) {
    res.status(404).send({ error: "User not found" })

    return
  }

  const post = await user.$relatedQuery("posts").where("id", postId)

  if (!post.length) {
    res.status(404).send({ error: "Post not found" })

    return
  }

  await user.$relatedQuery("comments").insert({
    content,
    user_id: userId,
    post_id: postId,
    publicationDate: new Date().toISOString(),
  })

  res.status(201).send({ status: "Comment created" })
}

export const getAllUsersWithRole = async (req, res) => {
  const usersWithRole = await UserModel.query()
    .select(
      "users.displayName",
      "users.email",
      "users.role_id",
      "roles.name as role"
    )
    .joinRelated("roles")

  res.status(200).send(usersWithRole)
}

export const getOneUserWithRole = async (req, res) => {
  const {
    params: { userId },
  } = req

  const userWithRole = await UserModel.query()
    .findById(userId)
    .select(
      "users.displayName",
      "users.email",
      "users.role_id",
      "roles.name as role"
    )
    .joinRelated("roles")

  if (!userWithRole) {
    res.status(404).send({ error: "User not found" })

    return
  }

  res.status(200).send(userWithRole)
}

export const getAllPostsByUser = async (req, res) => {
  const {
    params: { userId },
  } = req

  const user = await UserModel.query().findById(userId)

  if (!user) {
    res.status(404).send({ error: "User not found" })

    return
  }

  const posts = await user.$relatedQuery("posts")

  res.status(200).send(posts)
}

export const changeRole = async (req, res) => {
  const {
    params: { userId },
    body: { role },
  } = req

  const user = await UserModel.query().findById(userId)

  if (!user) {
    res.status(404).send({ error: "User not found" })

    return
  }

  await UserModel.query().updateAndFetchById(userId, {
    role_id: role,
  })

  res.status(200).send({ status: "User role changed" })
}

export const deleteOneUser = async (req, res) => {
  const {
    params: { userId },
  } = req

  const user = await UserModel.query().findById(userId)

  if (!user) {
    res.status(404).send({ error: "User not found" })

    return
  }

  await UserModel.query().delete().where({ id: userId })

  res.status(200).send({ status: "User deleted" })
}
