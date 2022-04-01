import Link from "next/link"
import { useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import api from "../../services/api"
import Spinner from "../Spinner"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const PostsList = () => {
  const [posts, setPosts] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    api
      .get("/posts")
      .then((response) => setPosts(response.data))
      .catch((error) =>
        setApiError(error.response ? error.response.data.error : error.message)
      )
  }, [])

  if (apiError) {
    return (
      <section className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
        <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
      </section>
    )
  }

  if (!posts) {
    return <Spinner contentname="posts" />
  }

  if (!posts.length) {
    return (
      <section>
        <p className="text-center text-pink-800 font-black text-2xl">
          No post found be the first to create one 👍
        </p>
      </section>
    )
  }

  return (
    <section>
      <h3 className="flex items-center justify-center py-5 bg-pink-800 text-white rounded-t text-3xl font-bold">
        Latest posts
      </h3>
      <ul className="mb-10 border border-pink-800 break-all rounded-b shadow">
        {posts.map((item, index) => (
          <li
            key={item.id}
            className={`p-5 ${index % 2 == 0 ? "bg-black" : "bg-white/5"}`}
          >
            <Link href={`/posts/${encodeURIComponent(item.id)}`} passHref>
              <a className="text-4xl text-white font-bold hover:text-red-500">
                {item.title}
              </a>
            </Link>
            <p className="mb-4 mt-2 text-white">
              by{" "}
              {item.author ? (
                <Link href={`/users/${encodeURIComponent(item.user_id)}`}>
                  <a className="font-bold underline text-white hover:text-pink-500">
                    {item.author}
                  </a>
                </Link>
              ) : (
                <span className="font-bold text-white underline">
                  Deleted user
                </span>
              )}{" "}
              on <span>{formatDate(item.publicationDate)}</span>
            </p>
            <Link href={`/posts/${encodeURIComponent(item.id)}`}>
              <a>
                <p className="text-justify cursor-pointer w-full text-white hover:bg-pink-200">
                  {item.content}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PostsList
