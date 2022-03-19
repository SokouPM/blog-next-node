export const seed = async (knex) => {
  await knex("comments").del()
  await knex("comments").insert([
    {
      id: 1,
      content: "reoe ioer guiehre erh gero hpez j^hôeth^jerjtopedipejr",
      publicationDate: new Date().toISOString(),
      user_id: 2,
      post_id: 3,
    },
    {
      id: 2,
      content: "esdfefjeipjoijjjopj ezfojepe zzfejop zfepoez pozef pzef",
      publicationDate: new Date().toISOString(),
      user_id: 1,
      post_id: 3,
    },
    {
      id: 3,
      content: "ru rz upuoeuojhdsf hieze upoizeçze zeufzjqih zioizhf hz",
      publicationDate: new Date().toISOString(),
      user_id: 3,
      post_id: 3,
    },
    {
      id: 4,
      content: "reoe ioer guiehre erh gero hpez j^hôeth^jerjtopedipejr",
      publicationDate: new Date().toISOString(),
      user_id: 1,
      post_id: 3,
    },
    {
      id: 5,
      content: "esdfefjeipjoijjjopj ezfojepe zzfejop zfepoez pozef pzef",
      publicationDate: new Date().toISOString(),
      user_id: 2,
      post_id: 3,
    },
    {
      id: 6,
      content: "ru rz upuoeuojhdsf hieze upoizeçze zeufzjqih zioizhf hz",
      publicationDate: new Date().toISOString(),
      user_id: 2,
      post_id: 3,
    },
    {
      id: 7,
      content: "1110001101101111101011111111000110110110",
      publicationDate: new Date().toISOString(),
      user_id: null,
      post_id: 5,
    },
    {
      id: 8,
      content: "0010101011100001101010100110100101111101",
      publicationDate: new Date().toISOString(),
      user_id: null,
      post_id: 5,
    },
  ])
}
