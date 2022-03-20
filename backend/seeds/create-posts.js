export const seed = async (knex) => {
  await knex("posts").del()
  await knex("posts").insert([
    {
      id: 1,
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a sem molestie, pellentesque quam vitae, egestas diam. Donec eu sem ornare, rhoncus tortor at, bibendum nunc. Proin blandit lacinia elementum. Donec sed dapibus neque, eu eleifend nunc. Vestibulum mollis odio vitae congue condimentum. Donec in diam a nisi rhoncus ullamcorper. Phasellus luctus arcu eget metus molestie faucibus. Etiam at sollicitudin mi. Sed suscipit, lectus vel euismod ultricies, dolor lorem hendrerit mauris, non egestas nibh neque sit amet urna. Pellentesque non mi faucibus felis tincidunt fermentum ac id ex. Suspendisse finibus lacus lacus, id aliquam sem facilisis non. Fusce vulputate orci eget porttitor dictum. Etiam hendrerit efficitur enim at blandit. Curabitur et dignissim ipsum. Cras rhoncus metus cursus arcu posuere, et auctor nunc interdum. Vivamus tristique et enim quis vulputate. ",
      publicationDate: new Date().toISOString(),
      user_id: 1,
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet laoreet diam, id ultricies nulla. Proin at gravida odio. Quisque nec nulla sed ipsum fermentum fermentum. In ut tortor lobortis, pulvinar lorem et, semper odio. In tempus, metus sed lacinia tempus, diam purus faucibus ante, id semper sem magna vestibulum mauris. Nullam facilisis urna vitae orci convallis, et viverra nunc porttitor. Pellentesque interdum, purus et tincidunt vulputate, augue erat scelerisque tellus, aliquam aliquam risus lectus a nulla. Aliquam a maximus quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies nunc metus, in laoreet nibh maximus tincidunt. Suspendisse venenatis ut eros hendrerit semper. Vestibulum at ipsum non orci placerat viverra vel luctus odio. Vestibulum tempor leo id odio interdum, id rutrum sapien pellentesque. Morbi bibendum vel ante et mollis. Nullam fringilla, augue non fermentum lobortis, metus felis porta est, non ullamcorper nunc felis at urna. Sed ullamcorper magna ipsum, eu vehicula erat elementum vitae. Integer eu pellentesque arcu, et fermentum libero. Donec ligula metus, tristique fermentum nunc vitae, accumsan faucibus purus. Donec dapibus mi et tellus tristique, eget facilisis elit ullamcorper. Nulla id sapien justo. In posuere dolor in nulla varius rutrum. Suspendisse dapibus aliquet diam id pharetra. Maecenas tincidunt erat interdum, facilisis turpis vitae, mollis augue. Suspendisse justo quam, dictum eu quam vel, fringilla semper lorem. Integer suscipit vestibulum dignissim. Sed in sapien vitae sem placerat dictum sed a justo. Suspendisse ac quam id risus dapibus condimentum a eu nulla. Pellentesque porttitor, lacus sagittis euismod scelerisque, augue erat maximus massa, ac vestibulum turpis sem ac erat. ",
      publicationDate: new Date().toISOString(),
      user_id: 2,
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum dui id est fringilla mollis. Aenean iaculis lobortis maximus. Suspendisse ac odio ex. Nullam luctus tellus a metus maximus, et tincidunt risus fringilla. Nulla facilisi. Sed tincidunt commodo sapien et semper. Mauris varius, lacus a dapibus lobortis, massa mauris porta metus, pharetra tincidunt tellus velit eget massa. Quisque convallis at nunc vel feugiat. Duis tellus enim, viverra sit amet libero sit amet, suscipit egestas mi. Nulla congue mollis magna eu tincidunt. Phasellus ultrices nisl eu risus porttitor, id luctus tellus aliquam. Ut et justo id ipsum viverra porttitor. Vestibulum ultrices eu diam eget vulputate. Vivamus ornare augue a ornare aliquet. Sed eu auctor dolor. Nam sodales velit quis egestas vehicula. In tortor urna, posuere eu arcu ultrices, finibus dapibus mi. Nullam semper, elit at aliquet accumsan, tellus est dictum leo, non fringilla tortor magna a urna. Fusce sodales eros eu quam rutrum tincidunt. Duis a elit lobortis, placerat odio ut, imperdiet leo. Sed ultrices tellus vel mauris faucibus, quis feugiat nibh aliquam. Donec non sem id odio molestie pretium quis ut purus. Duis tristique ipsum sed dui feugiat, eget pellentesque velit mattis. Quisque in dapibus neque. Proin at elit sed urna luctus pharetra. Mauris auctor lorem ut nunc luctus, vel ultrices lectus pellentesque. ",
      publicationDate: new Date().toISOString(),
      user_id: 1,
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eleifend sem nunc. Duis sit amet massa vitae massa tincidunt tristique. Praesent cursus, mauris a molestie tempus, arcu est sodales nulla, posuere varius nunc purus non sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi molestie orci sed risus elementum, mollis suscipit est eleifend. Sed id felis ligula. Aliquam non metus ac ante interdum faucibus. Maecenas vulputate, ex vel cursus tincidunt, elit lectus aliquam felis, non egestas libero purus sagittis turpis. Ut at ultricies metus. Etiam eget bibendum ligula. Sed sed eleifend massa. Sed hendrerit velit nunc, efficitur consequat tortor bibendum nec. Fusce non pellentesque orci. Cras vitae pharetra metus, eu viverra lorem. Ut feugiat consequat urna quis mattis. Morbi accumsan commodo dui in faucibus.",
      publicationDate: new Date().toISOString(),
      user_id: null,
    },
    {
      id: 5,
      title: "To delete message",
      content: "0101100110100101011011110001010101010101110010011101000111",
      publicationDate: new Date().toISOString(),
      user_id: null,
    },
    {
      id: 6,
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a sem molestie, pellentesque quam vitae, egestas diam. Donec eu sem ornare, rhoncus tortor at, bibendum nunc. Proin blandit lacinia elementum. Donec sed dapibus neque, eu eleifend nunc. Vestibulum mollis odio vitae congue condimentum. Donec in diam a nisi rhoncus ullamcorper. Phasellus luctus arcu eget metus molestie faucibus. Etiam at sollicitudin mi. Sed suscipit, lectus vel euismod ultricies, dolor lorem hendrerit mauris, non egestas nibh neque sit amet urna. Pellentesque non mi faucibus felis tincidunt fermentum ac id ex. Suspendisse finibus lacus lacus, id aliquam sem facilisis non. Fusce vulputate orci eget porttitor dictum. Etiam hendrerit efficitur enim at blandit. Curabitur et dignissim ipsum. Cras rhoncus metus cursus arcu posuere, et auctor nunc interdum. Vivamus tristique et enim quis vulputate. ",
      publicationDate: new Date().toISOString(),
      user_id: 1,
    },
    {
      id: 7,
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet laoreet diam, id ultricies nulla. Proin at gravida odio. Quisque nec nulla sed ipsum fermentum fermentum. In ut tortor lobortis, pulvinar lorem et, semper odio. In tempus, metus sed lacinia tempus, diam purus faucibus ante, id semper sem magna vestibulum mauris. Nullam facilisis urna vitae orci convallis, et viverra nunc porttitor. Pellentesque interdum, purus et tincidunt vulputate, augue erat scelerisque tellus, aliquam aliquam risus lectus a nulla. Aliquam a maximus quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies nunc metus, in laoreet nibh maximus tincidunt. Suspendisse venenatis ut eros hendrerit semper. Vestibulum at ipsum non orci placerat viverra vel luctus odio. Vestibulum tempor leo id odio interdum, id rutrum sapien pellentesque. Morbi bibendum vel ante et mollis. Nullam fringilla, augue non fermentum lobortis, metus felis porta est, non ullamcorper nunc felis at urna. Sed ullamcorper magna ipsum, eu vehicula erat elementum vitae. Integer eu pellentesque arcu, et fermentum libero. Donec ligula metus, tristique fermentum nunc vitae, accumsan faucibus purus. Donec dapibus mi et tellus tristique, eget facilisis elit ullamcorper. Nulla id sapien justo. In posuere dolor in nulla varius rutrum. Suspendisse dapibus aliquet diam id pharetra. Maecenas tincidunt erat interdum, facilisis turpis vitae, mollis augue. Suspendisse justo quam, dictum eu quam vel, fringilla semper lorem. Integer suscipit vestibulum dignissim. Sed in sapien vitae sem placerat dictum sed a justo. Suspendisse ac quam id risus dapibus condimentum a eu nulla. Pellentesque porttitor, lacus sagittis euismod scelerisque, augue erat maximus massa, ac vestibulum turpis sem ac erat. ",
      publicationDate: new Date().toISOString(),
      user_id: 2,
    },
    {
      id: 8,
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum dui id est fringilla mollis. Aenean iaculis lobortis maximus. Suspendisse ac odio ex. Nullam luctus tellus a metus maximus, et tincidunt risus fringilla. Nulla facilisi. Sed tincidunt commodo sapien et semper. Mauris varius, lacus a dapibus lobortis, massa mauris porta metus, pharetra tincidunt tellus velit eget massa. Quisque convallis at nunc vel feugiat. Duis tellus enim, viverra sit amet libero sit amet, suscipit egestas mi. Nulla congue mollis magna eu tincidunt. Phasellus ultrices nisl eu risus porttitor, id luctus tellus aliquam. Ut et justo id ipsum viverra porttitor. Vestibulum ultrices eu diam eget vulputate. Vivamus ornare augue a ornare aliquet. Sed eu auctor dolor. Nam sodales velit quis egestas vehicula. In tortor urna, posuere eu arcu ultrices, finibus dapibus mi. Nullam semper, elit at aliquet accumsan, tellus est dictum leo, non fringilla tortor magna a urna. Fusce sodales eros eu quam rutrum tincidunt. Duis a elit lobortis, placerat odio ut, imperdiet leo. Sed ultrices tellus vel mauris faucibus, quis feugiat nibh aliquam. Donec non sem id odio molestie pretium quis ut purus. Duis tristique ipsum sed dui feugiat, eget pellentesque velit mattis. Quisque in dapibus neque. Proin at elit sed urna luctus pharetra. Mauris auctor lorem ut nunc luctus, vel ultrices lectus pellentesque. ",
      publicationDate: new Date().toISOString(),
      user_id: 2,
    },
    {
      id: 9,
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eleifend sem nunc. Duis sit amet massa vitae massa tincidunt tristique. Praesent cursus, mauris a molestie tempus, arcu est sodales nulla, posuere varius nunc purus non sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi molestie orci sed risus elementum, mollis suscipit est eleifend. Sed id felis ligula. Aliquam non metus ac ante interdum faucibus. Maecenas vulputate, ex vel cursus tincidunt, elit lectus aliquam felis, non egestas libero purus sagittis turpis. Ut at ultricies metus. Etiam eget bibendum ligula. Sed sed eleifend massa. Sed hendrerit velit nunc, efficitur consequat tortor bibendum nec. Fusce non pellentesque orci. Cras vitae pharetra metus, eu viverra lorem. Ut feugiat consequat urna quis mattis. Morbi accumsan commodo dui in faucibus.",
      publicationDate: new Date().toISOString(),
      user_id: null,
    },
  ])
}
