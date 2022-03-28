import { useContext } from "react"
import Layout from "../src/components/Layout"
import UsersList from "../src/components/body/lists/UsersList"
import AppContext from "../src/components/AppContext"

const UsersListPage = () => {
  const { router, session } = useContext(AppContext)
  const sessionRoleId = JSON.parse(session).payload.user.roleId

  if (sessionRoleId != 3) {
    router.back()

    return null
  }

  return (
    <Layout pagename="Users list">
      <UsersList />
    </Layout>
  )
}

UsersListPage.private = true

export default UsersListPage
