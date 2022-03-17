import { Model } from "objection"
import CommentModel from "./Comment.js"
import UserModel from "./User.js"

class PostModel extends Model {
  static tableName = "posts"

  static get relationMappings() {
    return {
      users: {
        modelClass: UserModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "posts.user_id",
          to: "users.id",
        },
      },
      comments: {
        modelClass: CommentModel,
        relation: Model.HasManyRelation,
        join: {
          from: "posts.id",
          to: "comments.post_id",
        },
      },
    }
  }

  $beforeInsert() {
    this.publicationDate = new Date().toISOString()
    this.createdAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
}

export default PostModel
