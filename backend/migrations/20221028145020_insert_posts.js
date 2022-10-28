export const up = async (knex) => {
  await knex("posts").insert([
    {
      title: "Premié post admine 😁😁",
      content: "Bonjour c mon premier poste d'admine",
      publicationDate: new Date().toISOString(),
      user_id: 1,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Mon premmié poster 😊",
      content: "Bon jour a tou, jsuis new ici ihihihi",
      publicationDate: new Date().toISOString(),
      user_id: 2,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Les chat c tro mims ♥♥♥♥♥",
      content: "Les chat c tro mims ♥♥♥♥♥",
      publicationDate: new Date().toISOString(),
      user_id: 1,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Manioc industries",
      content:
        "etan jefe dentreprisse je sui a la recherche de gen competan pourr developeée mon buisinez comentezz ce post moi vitee 😁💕😘",
      publicationDate: new Date().toISOString(),
      user_id: 4,
      createdAt: new Date().toISOString(),
    },
    {
      title:
        "Je suis amoureux d'une fille au collège mais elle ne m'aime pas, à l'aide",
      content: "Aidez moi les grands manitou du sex*",
      publicationDate: new Date().toISOString(),
      user_id: 3,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Comment faire pour etre bo ?",
      content:
        "Chui moche de pere en fils et je veux avoir du swag comment je f",
      publicationDate: new Date().toISOString(),
      user_id: 3,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Arrété detre méchan 😥😥😥😥😥",
      content: "Plize stope !!!!",
      publicationDate: new Date().toISOString(),
      user_id: 1,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Bébou ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️",
      content: "Bébouuuuu ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️",
      publicationDate: new Date().toISOString(),
      user_id: 2,
      createdAt: new Date().toISOString(),
    },
    {
      title: "salut totu le mundo c xXdiablox32Xx",
      content: "g ouuvère ma shène sur l'internaite allaient vouar svp",
      publicationDate: new Date().toISOString(),
      user_id: 5,
      createdAt: new Date().toISOString(),
    },
    {
      title: "je souaite monté ma BARACK AFRITE alaid",
      content:
        "etan congolai je veu fair une etud 2 marche pacôme Toulemonde pour devenir riche alex terrieur de mon pei dites moi si vou blanche persones mangé frite 2 MANIOC",
      publicationDate: new Date().toISOString(),
      user_id: 4,
      createdAt: new Date().toISOString(),
    },
    {
      title: "kouukou totu le monde",
      content:
        "g fé mon premier bisou ajd, dé consaailles pour mon premiai sussage de zizi ?",
      publicationDate: new Date().toISOString(),
      user_id: 5,
      createdAt: new Date().toISOString(),
    },
    {
      title: "CHuuuuut🤫",
      content: "On parle ici mais on dis rien a personne 🤫",
      publicationDate: new Date().toISOString(),
      user_id: 2,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Tous les ga ils sont comme ça 🤏 trouvez moi un giga chibrax",
      content: "JE VE 2 LA BIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIITE",
      publicationDate: new Date().toISOString(),
      user_id: 1,
      createdAt: new Date().toISOString(),
    },
    {
      title: "La misiq",
      content: "Le seule vraie groupe pautable c'est Addelle",
      publicationDate: new Date().toISOString(),
      user_id: 6,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Le styleau magikue",
      content:
        "Cet Stylo a le pouvoir d'écrire tout seul. Je dis bien \"écrire tout seul\".\n\nIl suffit de le mettre sur les feuilles d'examen,concours,et il écrit tout\nseul les bonnes réponses.Mais pour ne pas attirer l'attention des autres\nparticipants,examinateurs,vous pourrez faire semblant d'écrire, ou de\ngriffonner n'importe quoi sur la page.\nÀ la correction ,le correcteur ne verra que les bonnes réponses. Cet\nStylot est une puissance mystique venant des forces de l'ombre et\nde la sorcelerie. Celui ou Celle qui est intéressé(e) par cet Stylot\nqu'il (elle) me contacte de toute urgence et dans la discrétion.\n\nSATISFACTION OU REMBOUSSEMENT IMMEDIATE\n\nCLIQUEZ  SUR CE MESSAGE POUR M'ECRIRE DIRECTEMENT SUR  WHATSAPP: +22962088956",
      publicationDate: new Date().toISOString(),
      user_id: 7,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Secret URL",
      content:
        'The reason using a "secret URL" is usually insecure is not because it is "security through obscurity". In information theory, a secret URL is no different than a password or private key. Are passwords and private keys considered a poor practice because they are "security through obscurity"? No.\n\nSo what\'s the difference between a hard-to-guess URL and a hard-to-guess password?\n\nThe difference is in the myriad of insecure places and ways that URLs are stored, displayed, and transmitted. Examples:\n\nIn web browser address bars, histories, and caches*\nHTTP Referer headers sent to other sites*\nIn web server access logs*\nIn proxy and layer 7 firewall access logs\nIn packet dumps\nIn web stats traffic reports (e.g. AWStats, Google Analytics)*\nHTTPS can protect some of these, but not all of them (items marked with a * are not protected against by using HTTPS.)',
      publicationDate: new Date().toISOString(),
      user_id: 8,
      createdAt: new Date().toISOString(),
    },
    {
      title: "suuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",
      content:
        "🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣",
      publicationDate: new Date().toISOString(),
      user_id: 9,
      createdAt: new Date().toISOString(),
    },
    {
      title: "Lien importan",
      content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      publicationDate: new Date().toISOString(),
      user_id: 1,
      createdAt: new Date().toISOString(),
    },
  ])
}

export const down = async (knex) => {
  await knex("posts").del()
}
