import { useEffect, useState } from "react"
import api from "../src/components/services/api"
import Layout from "../src/components/Layout"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get("/posts").then((response) => setPosts(response.data))
  }, [])

  return (
    <Layout pagename="Home">
      <ul className="pb-10">
        {posts.map((item) => (
          <li key={item.id} className="">
            <p className="text-4xl font-bold">{item.title}</p>
            <p className="mb-3">
              by{" "}
              <span className="font-bold underline">
                {item.author ? item.author : "Deleted user"}
              </span>{" "}
              on <span>{formatDate(item.publicationDate)}</span>
            </p>
            <p className="text-justify w-full">{item.content}</p>

            <div className="my-5 mx-auto w-max">
              ******************************************
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Home
