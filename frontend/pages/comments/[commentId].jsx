import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import ModifyCommentForm from "../../src/components/body/forms/ModifyCommentForm"
import Spinner from "../../src/components/body/Spinner"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const CommentPage = () => {
  const { session, router } = useContext(AppContext)
  const [comment, setComment] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [isModified, setIsModified] = useState(false)

  const sessionId = JSON.parse(session).payload.user.userId
  const userRoleId = JSON.parse(session).payload.user.roleId

  const {
    query: { commentId },
  } = useRouter()

  const deleteComment = async () => {
    await api.delete(`/comments/${commentId}`)
    router.back()
  }

  useEffect(() => {
    if (commentId && !isNaN(commentId)) {
      api
        .get(`/comments/${commentId}`)
        .then((response) => setComment(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [commentId])

  if (apiError) {
    return (
      <Layout pagename={`Comment: ${commentId}`}>
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
        </div>
      </Layout>
    )
  }

  if (isNaN(commentId) && commentId !== undefined) {
    return (
      <Layout pagename={`Comment: ${commentId}`}>
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> Comment Id must be a
          number
        </div>
      </Layout>
    )
  }

  if (!comment) {
    return (
      <Layout pagename={`Post: ${commentId}`}>
        <Spinner contentname="comment" />
      </Layout>
    )
  }

  return (
    <Layout pagename={`Comment: ${commentId}`}>
      {!isModified ? (
        <div className="mb-8 p-10 border-2 rounded shadow">
          <p className="mb-3 break-all font-bold">
            {comment.author ? (
              <Link href={`/users/${encodeURIComponent(comment.user_id)}`}>
                <a className="font-bold underline hover:text-blue-500">
                  {comment.author}
                </a>
              </Link>
            ) : (
              <span className="font-bold underline">Deleted user</span>
            )}{" "}
            commented on <span>{formatDate(comment.publicationDate)}</span>
          </p>
          <p className="text-justify break-all w-full">{comment.content}</p>
        </div>
      ) : (
        <ModifyCommentForm commentId={commentId} />
      )}

      {!isModified ? (
        comment.user_id == sessionId ||
        comment.postAuthorId == sessionId ||
        userRoleId == 3 ? (
          <section className="w-max mb-10 mx-auto">
            {comment.user_id == sessionId ? (
              <button
                className="bg-blue-500 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-blue-300 focus:outline focus:outline-3 focus:outline-blue-300 transition-all hover:scale-105"
                onClick={() => setIsModified(true)}
              >
                Modify comment
              </button>
            ) : null}
            <button
              className="bg-red-500 text-white mt-2 ml-2 text-lg font-bold border px-4 py-2 rounded  hover:bg-red-300 focus:outline focus:outline-3 focus:outline-red-300 transition-all hover:scale-105"
              onClick={deleteComment}
            >
              Delete comment
            </button>
          </section>
        ) : null
      ) : (
        <section className="w-max mb-10 mx-auto">
          <button
            className="bg-red-500 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-red-300 focus:outline focus:outline-3 focus:outline-red-300 transition-all hover:scale-105"
            onClick={() => setIsModified(false)}
          >
            Undo change
          </button>
        </section>
      )}
    </Layout>
  )
}

CommentPage.private = true

export default CommentPage
