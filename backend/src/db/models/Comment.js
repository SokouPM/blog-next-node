import { Model } from "objection"
import PostModel from "./Post.js"
import UserModel from "./User.js"

class CommentModel extends Model {
  static tableName = "comments"

  static get relationMappings() {
    return {
      users: {
        modelClass: UserModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "comments.user_id",
          to: "users.id",
        },
      },
      posts: {
        modelClass: PostModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "comments.post_id",
          to: "posts.id",
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

export default CommentModel
