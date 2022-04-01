import { useContext } from "react"
import AppContext from "../src/components/AppContext"
import Layout from "../src/components/Layout"
import CreatePostForm from "../src/components/body/forms/CreatePostForm"
import PostsList from "../src/components/body/lists/PostsList"

const HomePage = () => {
  const { session } = useContext(AppContext)

  let userRoleId = null

  if (session) {
    userRoleId = JSON.parse(session).payload.user.roleId
  }

  return (
    <Layout pagename="Home">
      {!session ? (
        <div className="text-white text-3xl text-center mb-10">
          Welcome, create an account or login to post or comment 😋
        </div>
      ) : null}
      {userRoleId && userRoleId > 1 ? <CreatePostForm /> : null}
      <PostsList />
    </Layout>
  )
}

export default HomePage
