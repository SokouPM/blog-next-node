import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"

const { JsonWebTokenError } = jsonwebtoken

const auth = async (req, res, next) => {
  const {
    headers: { authentication: jwt },
  } = req

  if (!jwt) {
    res.status(401).send({ error: "Unauthorized" })

    return
  }

  try {
    const payload = jsonwebtoken.verify(jwt, config.security.password.secret)
    req.payload = payload

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).send({ error: "Unauthorized" })

      return
    }

    res.status(500).send({ error: "Server error" })
  }
}

export default auth
