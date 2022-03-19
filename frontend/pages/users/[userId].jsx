import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import Spinner from "../../src/components/body/Spinner"
import UserPostsList from "../../src/components/body/UserPostsList"

const AccountPage = () => {
  const { session } = useContext(AppContext)
  const [user, setUser] = useState(null)
  const [apiError, setApiError] = useState(null)

  const sessionId = JSON.parse(session).payload.user.userId
  const userRoleId = JSON.parse(session).payload.user.roleId

  const {
    query: { userId: accountId },
  } = useRouter()

  useEffect(() => {
    if (accountId) {
      api
        .get(`/users/${accountId}`)
        .then((response) => setUser(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [accountId])

  if (apiError) {
    return (
      <Layout pagename={`Account: ${accountId}`}>
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
        </div>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout pagename={`Account: ${accountId}`}>
        <Spinner contentname="user" />
      </Layout>
    )
  }

  return (
    <Layout pagename={`Account: ${accountId}`}>
      <section className="flex mb-10">
        <div className="w-2/3">
          <p className="pt-4 pb-2 text-4xl font-bold border-b-2">
            Display name:{" "}
            <span className="font-semibold">{user.displayName}</span>
          </p>
          <p className="pt-4 pb-2 text-4xl font-bold border-b-2">
            Email: <span className="font-semibold">{user.email}</span>
          </p>
          <p className="pt-4 pb-2 text-4xl font-bold border-b-2">
            Role: <span className="font-semibold">{user.role}</span>
          </p>
        </div>
        <div className="w-1/3 border-2"></div>
      </section>

      {accountId == sessionId || userRoleId == 3 ? (
        <section className="mb-10 w-max mx-auto">
          <button className="bg-blue-500 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-blue-300 focus:outline focus:outline-3 focus:outline-blue-300 transition-all hover:scale-105">
            Modify account
          </button>
          <button className="bg-red-500 text-white mt-2 ml-2 text-lg font-bold border px-4 py-2 rounded  hover:bg-red-300 focus:outline focus:outline-3 focus:outline-red-300 transition-all hover:scale-105">
            Delete account
          </button>
        </section>
      ) : null}

      <UserPostsList userId={accountId} />
    </Layout>
  )
}

AccountPage.private = true

export default AccountPage
