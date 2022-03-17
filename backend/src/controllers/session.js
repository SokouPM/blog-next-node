import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import UserModel from "../db/models/User.js"

export const signUp = async (req, res) => {
  const {
    body: { displayName, email, password },
  } = req

  const existingMail = await UserModel.query().findOne({ email })

  if (existingMail) {
    res.status(409).send({ error: "User already exist" })

    return
  }

  const existingPseudo = await UserModel.query().findOne({ displayName })

  if (existingPseudo) {
    res.status(409).send({ error: "Pseudo already used" })

    return
  }

  const [hash, salt] = UserModel.hashPassword(password)

  await UserModel.query().insert({
    displayName,
    email,
    passwordHash: hash,
    passwordSalt: salt,
    role_id: 1,
  })

  res.status(201).send({ message: "Account created" })
}

export const signIn = async (req, res) => {
  const {
    body: { email, password },
  } = req

  const user = await UserModel.query().findOne({ email })

  if (!user || !user.checkPassword(password)) {
    res.status(401).send({ error: "Invalid login or password" })

    return
  }

  const jwt = jsonwebtoken.sign(
    {
      payload: {
        user: {
          userId: user.id,
          pseudo: user.displayName,
          email: user.email,
          roleId: user.role_id,
        },
      },
    },
    config.security.password.secret
  )
  res.status(200).send({ jwt })
}

export const modifyAccount = async (req, res) => {
  const {
    params: { userId },
    body: { displayName, password },
  } = req

  const existingUser = await UserModel.query().findById(userId)

  if (!existingUser) {
    res.status(404).send({ error: "User not found" })

    return
  }

  const existingPseudo = await UserModel.query()
    .findOne({ displayName })
    .whereNot("id", userId)

  if (existingPseudo) {
    res.status(409).send({ error: "Pseudo already used" })

    return
  }

  if (password) {
    const [hash, salt] = UserModel.hashPassword(password)

    await UserModel.query().updateAndFetchById(userId, {
      displayName,
      passwordHash: hash,
      passwordSalt: salt,
    })

    res.status(201).send({ message: "Account modified with password" })

    return
  }

  await UserModel.query().updateAndFetchById(userId, {
    displayName,
  })

  res.status(201).send({ message: "Account modified" })
}
