import { useContext, useEffect, useState, useCallback } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../../AppContext"
import api from "../../services/api"
import FormField from "./FormField"
import Spinner from "../Spinner"

const displayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Must be at most 100 characters")
    .required("Required field"),
  content: Yup.string()
    .max(1000, "Must be at most 1000 characters")
    .required("Required field"),
})

const ModifyPostForm = ({ postId }) => {
  const { router } = useContext(AppContext)
  const [post, setPost] = useState(null)

  const handleFormSubmit = useCallback(
    async ({ title, content }) => {
      await api.put(`/posts/${postId}`, { title, content })
      router.reload()
    },
    [postId, router]
  )

  useEffect(() => {
    if (postId && !isNaN(postId)) {
      api.get(`/posts/${postId}`).then((response) => setPost(response.data))
    }
  }, [postId])

  if (!post) {
    return <Spinner contentname="comment" />
  }

  return (
    <section className="mb-10 border-2 border-pink-700 rounded shadow">
      <div className="px-10 pt-6">
        <h2 className="text-4xl text-pink-700 font-bold mb-5">
          Modify post 🔨
        </h2>
        <Formik
          initialValues={{
            title: post.title,
            content: post.content,
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
                className="bg-pink-500 text-white mt-2 mb-6 text-lg font-bold border px-4 py-2 rounded hover:bg-pink-300 focus:outline focus:outline-3 focus:outline-pink-300  transition-all hover:scale-105"
                type="submit"
              >
                Modify post
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default ModifyPostForm
