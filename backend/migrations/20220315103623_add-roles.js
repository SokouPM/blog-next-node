export const up = async (knex) => {
  await knex("roles").insert([
    { name: "reader", createdAt: new Date().toISOString() },
    { name: "author", createdAt: new Date().toISOString() },
    { name: "admin", createdAt: new Date().toISOString() },
  ])
}

export const down = async (knex) => {
  await knex("roles").whereIn("name", ["reader", "author", "admin"]).del()
}
