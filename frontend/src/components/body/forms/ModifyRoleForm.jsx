import { useContext, useEffect, useState, useCallback } from "react"
import { Form, Formik, Field } from "formik"
import AppContext from "../../AppContext"
import api from "../../services/api"
import Spinner from "../../body/Spinner"
import Link from "next/link"
const ModifyRoleForm = ({ userId }) => {
  const { router } = useContext(AppContext)
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      api
        .get(`/users/${userId}`)
        .then((response) => setUser(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [userId])

  useEffect(() => {
    api.get("/roles").then((response) => setRoles(response.data))
  }, [])

  const handleFormSubmit = useCallback(
    async ({ role }) => {
      await api.put(`/users/${userId}`, {
        role,
      })
      router.reload()
    },
    [router, userId]
  )

  if (apiError) {
    return null
  }

  if (!user || !roles) {
    return (
      <section>
        <Spinner contentname="role form" />
      </section>
    )
  }

  return (
    <section className="mb-10 border-2 rounded border-pink-700">
      <div className="px-10 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-4xl mr-3 text-white font-bold">
            Modify user role :
          </h3>
          <Formik initialValues={{}} onSubmit={handleFormSubmit}>
            {() => (
              <Form>
                <Field
                  name="role"
                  as="select"
                  className="px-4 py-3 mr-2 rounded cursor-pointer font-bold bg-pink-300"
                  defaultValue={user.role_id}
                >
                  {roles.map((item) => (
                    <option key={item.id} value={item.id} name="role">
                      {item.name}
                    </option>
                  ))}
                </Field>
                <button
                  className="bg-pink-500 text-white text-lg font-bold border px-4 py-2 rounded hover:bg-pink-300 focus:outline focus:outline-3 focus:outline-pink-300  transition-all hover:scale-105"
                  type="submit"
                >
                  Modify role
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <Link href="/users">
          <a className="bg-pink-500 text-white text-lg font-bold border px-4 py-2 rounded hover:bg-pink-300 focus:outline focus:outline-3 focus:outline-pink-300 transition-all hover:scale-105">
            Users list
          </a>
        </Link>
      </div>
    </section>
  )
}

export default ModifyRoleForm
