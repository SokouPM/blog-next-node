import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../AppContext"
import api from "../services/api"
import Spinner from "../../components/body/Spinner"
import CommentsList from "../../components/body/lists/CommentsList"
import ModifyPostForm from "../../components/body/forms/ModifyPostForm"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const PostInfo = ({ postId }) => {
  const { session, router } = useContext(AppContext)
  const [post, setPost] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [isModified, setIsModified] = useState(false)

  const sessionId = JSON.parse(session).payload.user.userId
  const userRoleId = JSON.parse(session).payload.user.roleId

  const deletePost = async () => {
    await api.delete(`/posts/${postId}`)
    router.back()
  }

  useEffect(() => {
    if (postId && !isNaN(postId)) {
      api
        .get(`/posts/${postId}`)
        .then((response) => setPost(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [postId])

  if (apiError) {
    return (
      <section>
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
        </div>
      </section>
    )
  }

  if (isNaN(postId) && postId !== undefined) {
    return (
      <section>
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> Post Id must be a number
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section>
        <Spinner contentname="post" />
      </section>
    )
  }

  return (
    <section>
      {!isModified ? (
        <div className="mb-8 break-all p-10 border-2 rounded shadow">
          <p className="text-4xl font-bold">{post.title}</p>
          <p className="mb-3">
            by{" "}
            {post.author ? (
              <Link href={`/users/${encodeURIComponent(post.user_id)}`}>
                <a className="font-bold underline hover:text-blue-500">
                  {post.author}
                </a>
              </Link>
            ) : (
              <span className="font-bold underline">Deleted user</span>
            )}{" "}
            on <span>{formatDate(post.publicationDate)}</span>
          </p>
          <p className="text-justify w-full">{post.content}</p>
        </div>
      ) : (
        <ModifyPostForm postId={postId} />
      )}

      {!isModified ? (
        (post.user_id == sessionId || userRoleId == 3) && userRoleId != 1 ? (
          <div className="w-max mb-10 mx-auto">
            {post.user_id == sessionId ? (
              <button
                className="bg-blue-500 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-blue-300 focus:outline focus:outline-3 focus:outline-blue-300 transition-all hover:scale-105"
                onClick={() => setIsModified(true)}
              >
                Modify post
              </button>
            ) : null}
            <button
              className="bg-red-500 text-white mt-2 ml-2 text-lg font-bold border px-4 py-2 rounded  hover:bg-red-300 focus:outline focus:outline-3 focus:outline-red-300 transition-all hover:scale-105"
              onClick={deletePost}
            >
              Delete post
            </button>
          </div>
        ) : null
      ) : (
        <div className="w-max mb-10 mx-auto">
          <button
            className="bg-red-500 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-red-300 focus:outline focus:outline-3 focus:outline-red-300 transition-all hover:scale-105"
            onClick={() => setIsModified(false)}
          >
            Undo change
          </button>
        </div>
      )}

      <CommentsList postId={postId} postUserId={post.user_id} />
    </section>
  )
}

export default PostInfo
