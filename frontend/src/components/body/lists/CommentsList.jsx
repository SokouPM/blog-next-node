import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../AppContext"
import api from "../../services/api"
import Spinner from "../Spinner"
import CreateCommentForm from "../forms/CreateCommentForm"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const CommentsList = ({ postId, postUserId }) => {
  const { session } = useContext(AppContext)

  const [comments, setComments] = useState(null)
  const [apiError, setApiError] = useState(null)

  const sessionId = JSON.parse(session).payload.user.userId
  const userRoleId = JSON.parse(session).payload.user.roleId

  useEffect(() => {
    if (postId) {
      api
        .get(`posts/${postId}/comments`)
        .then((response) => setComments(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [postId])

  if (apiError) {
    return (
      <section className="border border-pink-800 mb-10 rounded">
        <h3 className="flex items-center justify-center py-5 bg-pink-800 rounded-t text-3xl font-bold">
          Comments
        </h3>
        <div className="w-full py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
        </div>
      </section>
    )
  }

  if (!comments) {
    return (
      <section className="border border-pink-800 mb-10 pb-10 rounded-b">
        <h3 className="flex items-center justify-center mb-10 py-5 bg-pink-800 rounded-t text-3xl font-bold">
          Comments
        </h3>
        <Spinner contentname="comments" />
      </section>
    )
  }

  if (!comments.length) {
    return (
      <section className="mb-10">
        <CreateCommentForm postId={postId} />
        <div className="shadow border pb-10 rounded">
          <h3 className="flex items-center justify-center mb-10 py-5 bg-pink-800 rounded-t text-3xl font-bold">
            Comments
          </h3>
          <p className="text-center text-2xl">No comments found 😥</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-10">
      <CreateCommentForm postId={postId} />
      <div className="shadow border border-pink-700 break-all rounded">
        <h3 className="flex items-center justify-center py-5 bg-pink-800 text-white rounded-t text-3xl font-bold">
          Comments
        </h3>
        <ul className="border border-pink-700 rounded-b">
          {comments.map((item, index) => (
            <li
              key={item.id}
              className={`p-5 text-white ${
                index % 2 == 0 ? "bg-black" : "bg-white/5"
              }`}
            >
              <p className="mb-3 font-bold">
                {item.author ? (
                  <Link href={`/users/${encodeURIComponent(item.user_id)}`}>
                    <a className="font-black underline hover:text-pink-500">
                      {item.author}
                    </a>
                  </Link>
                ) : (
                  <span className="underline">Deleted user</span>
                )}{" "}
                commented on <span>{formatDate(item.publicationDate)}</span>
              </p>
              <Link href={`/comments/${encodeURIComponent(item.id)}`}>
                <a>
                  <p className="text-justify w-full hover:bg-pink-200">
                    {item.content}
                  </p>
                </a>
              </Link>
              {item.user_id == sessionId ||
              postUserId == sessionId ||
              userRoleId == 3
                ? null
                : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CommentsList
