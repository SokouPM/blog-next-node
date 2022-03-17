import { Model } from "objection"
import { randomBytes, pbkdf2Sync } from "crypto"
import config from "../../config.js"
import RoleModel from "./Role.js"
import PostModel from "./Post.js"
import CommentModel from "./Comment.js"

const {
  security: {
    password: { saltLength, iterations, keylen, digest },
  },
} = config

class UserModel extends Model {
  static tableName = "users"

  static get relationMappings() {
    return {
      roles: {
        modelClass: RoleModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "users.role_id",
          to: "roles.id",
        },
      },
      posts: {
        modelClass: PostModel,
        relation: Model.HasManyRelation,
        join: {
          from: "users.id",
          to: "posts.user_id",
        },
      },
      comments: {
        modelClass: CommentModel,
        relation: Model.HasManyRelation,
        join: {
          from: "users.id",
          to: "comments.user_id",
        },
      },
    }
  }

  checkPassword = (password) => {
    const [hash] = UserModel.hashPassword(password, this.passwordSalt)

    return hash === this.passwordHash
  }

  static hashPassword = (
    password,
    salt = randomBytes(saltLength).toString("hex")
  ) => [
    pbkdf2Sync(password, salt, iterations, keylen, digest).toString("hex"),
    salt,
  ]

  $beforeInsert() {
    this.createdAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
}

export default UserModel
