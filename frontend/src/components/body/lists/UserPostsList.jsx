import Link from "next/link"
import { useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import api from "../../services/api"
import Spinner from "../Spinner"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const UserPostsList = ({ userId }) => {
  const [posts, setPosts] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (userId) {
      api
        .get(`users/${userId}/posts`)
        .then((response) => setPosts(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [userId])

  if (apiError) {
    return (
      <section className="shadow rounded-b">
        <h3 className="flex items-center justify-center py-5 bg-slate-300 rounded-t text-3xl font-bold">
          User posts
        </h3>
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
        </div>
      </section>
    )
  }

  if (!posts) {
    return (
      <section className="shadow pb-10 rounded-b">
        <h3 className="flex items-center justify-center mb-10 py-5 bg-slate-300 rounded-t text-3xl font-bold">
          User posts
        </h3>
        <Spinner contentname="posts" />
      </section>
    )
  }

  if (!posts.length) {
    return (
      <section className="shadow pb-10 rounded-b">
        <h3 className="flex items-center justify-center mb-10 py-5 bg-slate-300 rounded-t text-3xl font-bold">
          User posts
        </h3>
        <p className="text-center text-2xl">No post found 😥</p>
      </section>
    )
  }

  return (
    <section className="shadow rounded-b">
      <h3 className="flex items-center justify-center py-5 bg-slate-300 rounded-t text-3xl font-bold">
        User posts
      </h3>
      <ul className="mb-10 max-h-96 border break-all rounded-b overflow-x-auto">
        {posts.map((item, index) => (
          <Link key={item.id} href={`/posts/${item.id}`} passHref>
            <li
              className={`cursor-pointer hover:shadow-lg p-5 hover:bg-gray-200 ${
                index % 2 == 0 ? null : "bg-slate-100"
              }`}
            >
              <p className="text-4xl font-bold">{item.title}</p>
              <p className="mb-3">
                on <span>{formatDate(item.publicationDate)}</span>
              </p>
              <p className="text-justify w-full">{item.content}</p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  )
}

export default UserPostsList
