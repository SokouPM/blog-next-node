import { Model } from "objection"
import UserModel from "./User.js"

class RoleModel extends Model {
  static tableName = "roles"

  static get relationMappings() {
    return {
      users: {
        modelClass: UserModel,
        relation: Model.HasManyRelation,
        join: {
          from: "roles.id",
          to: "users.role_id",
        },
      },
    }
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
}

export default RoleModel
