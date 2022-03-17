import RoleModel from "../db/models/Role.js"

export const getAllRoles = async (req, res) => {
  const roles = await RoleModel.query()

  res.status(200).send(roles)
}

export const getOneRole = async (req, res) => {
  const {
    params: { roleId },
  } = req

  const role = await RoleModel.query().findById(roleId)

  if (!role) {
    res.status(404).send({ error: "Role not found" })

    return
  }

  res.status(200).send(role)
}
