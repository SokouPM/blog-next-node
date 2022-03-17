import Link from "next/link"
import { useCallback, useContext } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { FiAlertTriangle } from "react-icons/fi"
import Layout from "../src/components/Layout"
import AppContext from "../src/components/AppContext"
import FormField from "../src/components/body/forms/FormField"
import PasswordField from "../src/components/body/forms/PasswordField"

const displayingErrorMessagesSchema = Yup.object().shape({
  displayName: Yup.string()
    .max(40, "Must be at most 40 characters")
    .required("Required field"),
  email: Yup.string().email("Must be a valid email").required("Required field"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .max(30, "Must be at most 30 characters")
    .matches(/^.*(?=.*[a-z]).*$/g, "Password must contain at least 1 lowercase")
    .matches(/^.*(?=.*[A-Z]).*$/g, "Password must contain at least 1 upercase")
    .matches(/^.*(?=.*[0-9]).*$/g, "Password must contain at least 1 number")
    .required("Required field"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required field"),
})

const Signup = () => {
  const { signUp, signUpError } = useContext(AppContext)
  const handleFormSubmit = useCallback(
    async ({ displayName, email, password }) => {
      return signUp(displayName, email, password)
    },
    [signUp]
  )

  return (
    <Layout pagename="Sign Up">
      <div>
        {signUpError ? (
          <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
            <FiAlertTriangle className="text-5xl mr-3" />
            {signUpError}
          </div>
        ) : null}
        <h2 className="text-4xl font-bold mb-5">Sign Up</h2>
        <Formik
          initialValues={{
            displayName: "Test",
            email: "test@test.fr",
            password: "5Az666",
            passwordConfirm: "5Az666",
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
                placeholder="1 uppercase, 1 lowercase, 1 number and between 6 and 30 characters "
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
                className="bg-slate-200  mt-2 text-lg font-bold border px-4 py-2 hover:bg-slate-100 "
                type="submit"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-xl text-center">
          ⚠ Already have an account?{" "}
          <Link href="/signin">
            <a className="font-bold">Sign In</a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}

Signup.noSessionOnly = true

export default Signup