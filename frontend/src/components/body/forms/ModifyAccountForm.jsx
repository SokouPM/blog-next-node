import { useContext, useEffect, useState, useCallback } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../AppContext"
import api from "../../services/api"
import FormField from "../../body/forms/FormField"
import PasswordField from "../../body/forms/PasswordField"
import Spinner from "../../body/Spinner"

const displayingErrorMessagesSchema = Yup.object().shape({
  displayName: Yup.string()
    .max(40, "Must be at most 40 characters")
    .required("Required field"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .max(30, "Must be at most 30 characters")
    .matches(/^.*(?=.*[a-z]).*$/g, "Password must contain at least 1 lowercase")
    .matches(/^.*(?=.*[A-Z]).*$/g, "Password must contain at least 1 upercase")
    .matches(/^.*(?=.*[0-9]).*$/g, "Password must contain at least 1 number"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
})

const ModifyAccountForm = ({ userId }) => {
  const { router } = useContext(AppContext)
  const [user, setUser] = useState(null)
  const [apiError, setApiError] = useState(null)

  const handleFormSubmit = useCallback(
    async ({ displayName, email, password }) => {
      try {
        await api.put(`/sessions/${userId}`, {
          displayName,
          email,
          password,
        })
        setApiError(null)
        router.push(`/users/${userId}`)
      } catch (err) {
        setApiError(err.response.data.error)
      }
    },
    [router, userId]
  )

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      api.get(`/users/${userId}`).then((response) => setUser(response.data))
    }
  }, [userId])

  if (!user) {
    return (
      <section>
        <Spinner contentname="comment" />
      </section>
    )
  }

  return (
    <section className="w-4/5 mx-auto border-2 rounded border-pink-700 shadow">
      {apiError ? (
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" />
          {apiError}
        </div>
      ) : null}
      <div className="px-10 py-6">
        <h2 className="text-4xl font-bold text-pink-600 mb-5">
          Modify account
        </h2>
        <Formik
          initialValues={{
            displayName: user.displayName,
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={displayingErrorMessagesSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormField
                label="Username"
                id="displayName"
                name="displayName"
                placeholder="Sokou"
                errorType={errors.displayName}
                touchedType={touched.displayName}
              />
              <FormField
                label="Password"
                type={PasswordField}
                id="password"
                name="password"
                placeholder="1 uppercase, 1 lowercase, 1 number and between 6 and 30 characters"
                errorType={errors.password}
                touchedType={touched.password}
              />
              <FormField
                label="Confirm password"
                type={PasswordField}
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Same as password "
                errorType={errors.passwordConfirm}
                touchedType={touched.passwordConfirm}
              />
              <button
                className="bg-pink-500 text-white mt-2 text-lg font-bold border px-4 py-2 rounded hover:bg-pink-300 focus:outline focus:outline-3 focus:outline-pink-300  transition-all hover:scale-105"
                type="submit"
              >
                Modify account
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default ModifyAccountForm
