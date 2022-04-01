import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../components/AppContext"
import api from "../../components/services/api"
import ModifyCommentForm from "../../components/body/forms/ModifyCommentForm"
import Spinner from "../../components/body/Spinner"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const CommentInfos = ({ commentId }) => {
  const { session, router } = useContext(AppContext)
  const [comment, setComment] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [isModified, setIsModified] = useState(false)

  const sessionId = JSON.parse(session).payload.user.userId
  const userRoleId = JSON.parse(session).payload.user.roleId

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
      <section className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
        <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
      </section>
    )
  }

  if (isNaN(commentId) && commentId !== undefined) {
    return (
      <section className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
        <FiAlertTriangle className="text-5xl mr-3" /> Comment Id must be a
        number
      </section>
    )
  }

  if (!comment) {
    return (
      <section>
        <Spinner contentname="comment" />
      </section>
    )
  }

  return (
    <section>
      {!isModified ? (
        <div className="mb-8 p-10 border-2 border-pink-500 text-white rounded shadow">
          <p className="mb-3 break-all font-bold">
            {comment.author ? (
              <Link href={`/users/${encodeURIComponent(comment.user_id)}`}>
                <a className="font-bold underline hover:text-pink-500">
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
                className="bg-pink-500 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-pink-300 focus:outline focus:outline-3 focus:outline-pink-300 transition-all hover:scale-105"
                onClick={() => setIsModified(true)}
              >
                Modify comment
              </button>
            ) : null}
            <button
              className="bg-red-700 text-white mt-2 ml-2 text-lg font-bold border px-4 py-2 rounded  hover:bg-red-400 focus:outline focus:outline-3 focus:outline-red-400 transition-all hover:scale-105"
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
    </section>
  )
}

export default CommentInfos
