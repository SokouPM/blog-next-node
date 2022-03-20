import { useCallback, useContext } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../../AppContext"
import api from "../../services/api"
import FormField from "./FormField"

const displayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string()
    .max(500, "Must be at most 500 characters")
    .required("Required field"),
})

const CreateCommentForm = ({ postId }) => {
  const { router, session } = useContext(AppContext)
  const sessionId = JSON.parse(session).payload.user.userId

  const handleFormSubmit = useCallback(
    async ({ content }) => {
      await api.post(`/users/${sessionId}/posts/${postId}/comments`, {
        content,
      })
      router.reload()
    },
    [postId, router, sessionId]
  )

  return (
    <div className="mb-10 border-2 rounded shadow">
      <div className="px-10 pt-6">
        <h2 className="text-4xl font-bold mb-5">Create comment</h2>
        <Formik
          initialValues={{
            content: "",
          }}
          validationSchema={displayingErrorMessagesSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormField
                type="textarea"
                name="content"
                placeholder="Content of comment"
                rows="4"
                errorType={errors.content}
                touchedType={touched.content}
              />
              <button
                className="bg-green-500 text-white mt-2 mb-6 text-lg font-bold border px-4 py-2 rounded hover:bg-green-300 focus:outline focus:outline-3 focus:outline-green-300  transition-all hover:scale-105"
                type="submit"
              >
                Create comment
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateCommentForm
