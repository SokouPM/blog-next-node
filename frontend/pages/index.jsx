import Link from "next/link"
import { useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import api from "../src/components/services/api"
import Layout from "../src/components/Layout"
import Spinner from "../src/components/body/Spinner"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const Home = () => {
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
      <Layout pagename="Home">
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> {apiError}
        </div>
      </Layout>
    )
  }

  if (!posts) {
    return (
      <Layout pagename="Home">
        <Spinner contentname="posts" />
      </Layout>
    )
  }

  if (!posts.length) {
    return (
      <Layout pagename="Home">
        <p className="text-center text-2xl">
          No post found be the first to create one 👍
        </p>
      </Layout>
    )
  }

  return (
    <Layout pagename="Home">
      <h3 className="flex items-center justify-center py-5 bg-slate-300 rounded-t text-3xl font-bold">
        Latest posts
      </h3>
      <ul className="mb-10 border rounded-b shadow">
        {posts.map((item, index) => (
          <li
            key={item.id}
            className={`p-5 ${index % 2 == 0 ? null : "bg-slate-100"}`}
          >
            <Link href={`/posts/${item.id}`} passHref>
              <a className="text-4xl font-bold hover:text-blue-500">
                {item.title}
              </a>
            </Link>
            <p className="mb-3">
              by{" "}
              {item.author ? (
                <Link href={`/users/${item.user_id}`}>
                  <a className="font-bold underline hover:text-blue-500">
                    {item.author}
                  </a>
                </Link>
              ) : (
                <span className="font-bold underline">Deleted user</span>
              )}{" "}
              on <span>{formatDate(item.publicationDate)}</span>
            </p>
            <Link href={`/posts/${item.id}`}>
              <a>
                <p className="rounded text-justify cursor-pointer w-full hover:text-blue-500">
                  {item.content}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Home
