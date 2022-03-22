import { useRouter } from "next/router"
import { useContext } from "react"
import Layout from "../../../src/components/Layout"
import AppContext from "../../../src/components/AppContext"
import ModifyAccountForm from "../../../src/components/body/forms/ModifyAccountForm"

const ModifyAccountPage = () => {
  const { router, session } = useContext(AppContext)

  const sessionId = JSON.parse(session).payload.user.userId

  const {
    query: { userId },
  } = useRouter()

  if (userId != sessionId) {
    router.back()

    return null
  }

  return (
    <Layout pagename="Modify account">
      <ModifyAccountForm userId={userId} />
    </Layout>
  )
}

ModifyAccountPage.private = true

export default ModifyAccountPage
