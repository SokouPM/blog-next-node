import chalk from "chalk"
import "dotenv/config"
import * as yup from "yup"

const portValidator = yup.number().integer().min(80).max(65535)

const schema = yup.object().shape({
  port: portValidator.required(),
  db: yup
    .object()
    .shape({
      client: yup.string().oneOf(["pg", "mysql", "mysql2"]).required(),
      connection: yup
        .object()
        .shape({
          database: yup.string().required(),
          user: yup.string().required(),
          password: yup.string(),
          host: yup.string(),
          port: portValidator,
        })
        .required(),
    })
    .required(),
  security: yup.object().shape({
    password: yup.object().shape({
      secret: yup.string().min(32).required(),
    }),
  }),
})

const rawConfig = {
  port: process.env.PORT,
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      connectionString: process.env.DATABASE_URL,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
    },
    migrations: {
      stub: "./src/db/migration.stub",
    },
  },
  security: {
    password: {
      saltLength: 32,
      iterations: 100000,
      keylen: 256,
      digest: "sha512",
      expiresIn: "2 days",
      secret: process.env.JWT_SECRET,
    },
  },
}

try {
  schema.validateSync(rawConfig, { abortEarly: false })
} catch (err) {
  throw new Error(
    `${chalk.red("🛑 ValidationError")}: \n - ${err.errors
      .map((msg) => chalk.bgRed(msg))
      .join("\n - ")}`
  )
}

const config = schema.cast(rawConfig)

export default config
