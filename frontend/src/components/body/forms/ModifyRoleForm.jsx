import { useContext, useEffect, useState, useCallback } from "react"
import { Form, Formik, Field } from "formik"
import AppContext from "../../AppContext"
import api from "../../services/api"
import Spinner from "../../body/Spinner"

const ModifyRoleForm = ({ userId }) => {
  const { router } = useContext(AppContext)
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState(null)

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      api.get(`/users/${userId}`).then((response) => setUser(response.data))
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

  if (!user || !roles) {
    return (
      <section>
        <Spinner contentname="role form" />
      </section>
    )
  }

  return (
    <section className="mb-10 border-2 rounded shadow">
      <div className="px-10 pt-6 flex items-center">
        <h3 className="text-4xl font-bold mb-5 mr-5">Modify user role :</h3>
        <Formik initialValues={{}} onSubmit={handleFormSubmit}>
          {() => (
            <Form>
              <Field
                name="role"
                as="select"
                className="px-4 py-3 mr-2 rounded cursor-pointer bg-gray-200"
                defaultValue={user.role_id}
              >
                {roles.map((item) => (
                  <option key={item.id} value={item.id} name="role">
                    {item.name}
                  </option>
                ))}
              </Field>
              <button
                className="bg-green-500 text-white mt-2 mb-6 text-lg font-bold border px-4 py-2 rounded hover:bg-green-300 focus:outline focus:outline-3 focus:outline-green-300  transition-all hover:scale-105"
                type="submit"
              >
                Modify role
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default ModifyRoleForm
