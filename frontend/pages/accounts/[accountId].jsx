import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"

const UserPage = () => {
  const { session } = useContext(AppContext)
  const [user, setUser] = useState()
  const userId = JSON.parse(session).payload.user.userId
  const {
    query: { accountId },
  } = useRouter()

  useEffect(() => {
    api.get(`/users/${accountId}`).then((response) => setUser(response.data))
  }, [accountId])

  return (
    <Layout pagename={`Account : ${accountId}`}>
      {accountId == userId ? (
        <div>Account ID : {accountId}</div>
      ) : (
        401 + ": unothorized"
      )}

      <div>
        <p className="text-4xl font-bold">{user.displayName}</p>
      </div>
    </Layout>
  )
}

UserPage.private = true

export default UserPage
