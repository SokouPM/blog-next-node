import { useCallback, useContext } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../../AppContext"
import api from "../../services/api"
import FormField from "./FormField"

const displayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Must be at most 100 characters")
    .required("Required field"),
  content: Yup.string()
    .max(1000, "Must be at most 1000 characters")
    .required("Required field"),
})

const CreatePostForm = () => {
  const { router, session } = useContext(AppContext)
  const sessionId = JSON.parse(session).payload.user.userId

  const handleFormSubmit = useCallback(
    async ({ title, content }) => {
      await api.post(`/users/${sessionId}/posts`, { title, content })
      router.reload()
    },
    [router, sessionId]
  )

  return (
    <div className="mb-10 border-2 rounded shadow">
      <div className="px-10 pt-6">
        <h2 className="text-4xl font-bold mb-5">Create post</h2>
        <Formik
          initialValues={{
            title: "",
            content: "",
          }}
          validationSchema={displayingErrorMessagesSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormField
                label="Title"
                id="title"
                name="title"
                placeholder="Title of post"
                errorType={errors.title}
                touchedType={touched.title}
              />
              <FormField
                label="Content"
                type="textarea"
                id="content"
                name="content"
                placeholder="Content of post"
                rows="8"
                errorType={errors.content}
                touchedType={touched.content}
              />
              <button
                className="bg-green-500 text-white mt-2 mb-6 text-lg font-bold border px-4 py-2 rounded hover:bg-green-300 focus:outline focus:outline-3 focus:outline-green-300  transition-all hover:scale-105"
                type="submit"
              >
                Create post
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreatePostForm
