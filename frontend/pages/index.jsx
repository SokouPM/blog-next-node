import { useContext } from "react"
import AppContext from "../src/components/AppContext"
import Layout from "../src/components/Layout"
import CreatePostForm from "../src/components/body/forms/CreatePostForm"
import PostsList from "../src/components/body/lists/PostsList"

const Home = () => {
  const { session } = useContext(AppContext)

  let userRoleId = null

  if (session) {
    userRoleId = JSON.parse(session).payload.user.roleId
  }

  return (
    <Layout pagename="Home">
      {userRoleId && userRoleId > 1 ? <CreatePostForm /> : null}
      <PostsList />
    </Layout>
  )
}

export default Home
