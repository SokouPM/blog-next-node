import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import Spinner from "../../src/components/body/Spinner"
import CommentsList from "../../src/components/body/CommentsList"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const PostPage = () => {
  const { session } = useContext(AppContext)
  const [post, setPost] = useState(null)
  const [apiError, setApiError] = useState(null)

  const sessionId = JSON.parse(session).payload.user.userId
  const userRoleId = JSON.parse(session).payload.user.roleId

  const {
    query: { postId },
  } = useRouter()

  useEffect(() => {
    if (postId) {
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
      <Layout pagename={`Post: ${postId}`}>
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
        </div>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout pagename={`Post: ${postId}`}>
        <Spinner contentname="post" />
      </Layout>
    )
  }

  return (
    <Layout pagename={`Post: ${postId}`}>
      <div className="mb-8">
        <p className="text-4xl font-bold">{post.title}</p>
        <p className="mb-3">
          by{" "}
          {post.author ? (
            <Link href={`/users/${post.user_id}`}>
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

      {(post.user_id == sessionId || userRoleId == 3) && userRoleId != 1 ? (
        <section className="w-max mb-10 mx-auto">
          <button className="bg-blue-500 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-blue-300 focus:outline focus:outline-3 focus:outline-blue-300 transition-all hover:scale-105">
            Modify post
          </button>
          <button className="bg-red-500 text-white mt-2 ml-2 text-lg font-bold border px-4 py-2 rounded  hover:bg-red-300 focus:outline focus:outline-3 focus:outline-red-300 transition-all hover:scale-105">
            Delete post
          </button>
        </section>
      ) : null}

      <CommentsList postId={postId} />
    </Layout>
  )
}

PostPage.private = true

export default PostPage
