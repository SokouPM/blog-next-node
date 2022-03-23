import { useContext, useEffect, useState, useCallback } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../../AppContext"
import api from "../../services/api"
import FormField from "./FormField"
import Spinner from "../../body/Spinner"

const displayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string()
    .max(500, "Must be at most 500 characters")
    .required("Required field"),
})

const CommentsForm = ({ commentId }) => {
  const { router } = useContext(AppContext)
  const [comment, setComment] = useState(null)

  const handleFormSubmit = useCallback(
    async ({ content }) => {
      await api.put(`/comments/${commentId}`, {
        content,
      })
      router.reload()
    },
    [commentId, router]
  )

  useEffect(() => {
    if (commentId && !isNaN(commentId)) {
      api
        .get(`/comments/${commentId}`)
        .then((response) => setComment(response.data))
    }
  }, [commentId])

  if (!comment) {
    return <Spinner contentname="comment" />
  }

  return (
    <section className="mb-10 border-2 rounded shadow">
      <div className="px-10 pt-6">
        <h2 className="text-4xl font-bold mb-5">Modify comment</h2>
        <Formik
          initialValues={{
            content: comment.content,
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
                Modify comment
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default CommentsForm
