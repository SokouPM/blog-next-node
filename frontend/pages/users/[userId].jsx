import { useRouter } from "next/router"
import { useContext } from "react"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import ModifyRoleForm from "../../src/components/body/forms/ModifyRoleForm"
import UserInfos from "../../src/components/body/UserInfos"

const AccountPage = () => {
  const { session } = useContext(AppContext)
  const sessionRoleId = JSON.parse(session).payload.user.roleId

  const {
    query: { userId: accountId },
  } = useRouter()

  return (
    <Layout pagename={`Account: ${accountId}`}>
      {sessionRoleId == 3 && !isNaN(accountId) ? (
        <ModifyRoleForm sessionRoleId={sessionRoleId} userId={accountId} />
      ) : null}
      <UserInfos accountId={accountId} />
    </Layout>
  )
}

AccountPage.private = true

export default AccountPage
