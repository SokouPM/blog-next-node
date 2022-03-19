import Link from "next/link"
import { useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import api from "../services/api"
import Spinner from "./Spinner"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState(null)
  const [apiError, setApiError] = useState(null)

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
      <section className="shadow">
        <h3 className="flex items-center justify-center py-5 bg-slate-300 rounded-t text-3xl font-bold">
          Comments
        </h3>
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
        </div>
      </section>
    )
  }

  if (!comments) {
    return (
      <section className="shadow pb-10">
        <h3 className="flex items-center justify-center mb-10 py-5 bg-slate-300 rounded-t text-3xl font-bold">
          Comments
        </h3>
        <Spinner contentname="comments" />
      </section>
    )
  }

  if (!comments.length) {
    return (
      <section className="shadow pb-10">
        <h3 className="flex items-center justify-center mb-10 py-5 bg-slate-300 rounded-t text-3xl font-bold">
          Comments
        </h3>
        <p className="text-center text-2xl">No comments found 😥</p>
      </section>
    )
  }

  return (
    <section className="shadow">
      <h3 className="flex items-center justify-center py-5 bg-slate-300 rounded-t text-3xl font-bold">
        Comments
      </h3>
      <ul className="mb-10 border rounded-b">
        {comments.map((item, index) => (
          <Link key={item.id} href={`/comments/${item.id}`} passHref>
            <li
              className={`cursor-pointer hover:shadow-lg p-5 hover:bg-gray-200 ${
                index % 2 == 0 ? null : "bg-slate-100"
              }`}
            >
              <p className="mb-3 font-bold">
                {item.author ? (
                  <Link href={`/users/${item.user_id}`}>
                    <a className="font-black underline hover:text-blue-500">
                      {item.author}
                    </a>
                  </Link>
                ) : (
                  <span className="underline">Deleted user</span>
                )}{" "}
                commented on <span>{formatDate(item.publicationDate)}</span>
              </p>
              <p className="text-justify w-full">{item.content}</p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  )
}

export default CommentsList
