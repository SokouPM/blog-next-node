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
}

export default RoleModel
