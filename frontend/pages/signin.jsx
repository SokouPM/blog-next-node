import Link from "next/link"
import { useCallback, useContext } from "react"
import Layout from "../src/components/Layout"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../src/components/AppContext"
import FormField from "../src/components/body/forms/FormField"
import PasswordField from "../src/components/body/forms/PasswordField"

const displayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email").required("Required field"),
  password: Yup.string().required("Required field"),
})

const SigninPage = () => {
  const { signIn, signInError } = useContext(AppContext)
  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      return signIn(email, password)
    },
    [signIn]
  )

  return (
    <Layout pagename="Sign In">
      <div className="w-4/5 mx-auto border-2 border-pink-700 rounded">
        {signInError ? (
          <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
            <FiAlertTriangle className="text-5xl mr-3" />
            {signInError}
          </div>
        ) : null}
        <div className="px-10 pt-6">
          <h2 className="text-4xl font-bold text-white mb-5">Sign In</h2>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={displayingErrorMessagesSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <FormField
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="exemple@mail.com"
                  errorType={errors.email}
                  touchedType={touched.email}
                />
                <FormField
                  label="Password"
                  type={PasswordField}
                  id="password"
                  name="password"
                  placeholder="Your password"
                  errorType={errors.password}
                  touchedType={touched.password}
                />
                <p className="mb-5 text-lg  text-white">
                  Forgotten password?{" "}
                  <Link href="/404">
                    <a className="font-bold hover:underline">Click here</a>
                  </Link>
                </p>
                <button
                  className="bg-pink-500 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-pink-300 focus:outline focus:outline-3 focus:outline-pink-300  transition-all hover:scale-105"
                  type="submit"
                >
                  Sign In
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <p className="mt-6 p-5 text-xl text-center text-white bg-pink-700">
          ⚠ Don't have an account?{" "}
          <Link href="/signup">
            <a className="font-bold hover:underline">Sign Up</a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}

SigninPage.noSessionOnly = true

export default SigninPage
