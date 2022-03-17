import cors from "cors"
import express from "express"
import knex from "knex"
import { Model } from "objection"
import pino from "pino"
import config from "./src/config.js"

import roleRoutes from "./src/routes/role.js"
import sessionRoutes from "./src/routes/session.js"
import userRoutes from "./src/routes/user.js"
import postRoutes from "./src/routes/post.js"
import commentRoutes from "./src/routes/comment.js"

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
})
const app = express()
const db = knex(config.db)

Model.knex(db)
app.use(
  cors({
    origin: process.env.WEB_APP_ORIGIN,
  })
)
app.use(express.json())

app.use("/roles", roleRoutes)
app.use("/sessions", sessionRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)

app.listen(config.port, () => logger.info(`listening on :${config.port}`))
