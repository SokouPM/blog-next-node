import Link from "next/link"
import { FiAlertTriangle } from "react-icons/fi"
import { useEffect, useState } from "react"
import api from "../../services/api"
import Spinner from "../Spinner"
const UsersList = () => {
  const [users, setUsers] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    api
      .get("/users")
      .then((response) => setUsers(response.data))
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

  if (!users) {
    return <Spinner contentname="users" />
  }

  if (!users.length) {
    return (
      <section>
        <p className="text-center text-2xl">
          How did you get to this page if there are no users? 🤨👺
        </p>
      </section>
    )
  }

  return (
    <section>
      <h3 className="flex items-center justify-center py-5 bg-slate-300 rounded-t text-3xl font-bold">
        Users lists
      </h3>
      <ul className="mb-10 border break-all rounded-b shadow">
        {users.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center justify-between px-2 py-2 ${
              index % 2 == 0 ? null : "bg-slate-100"
            }`}
          >
            <div className="flex items-center justify-between text-xl">
              <p className="mr-10 font-bold">
                DisplayName:{" "}
                <span className="font-normal underline">
                  {item.displayName}
                </span>
              </p>
              <p className="mr-10 font-bold">
                Email:{" "}
                <span className="font-normal underline">{item.email}</span>
              </p>
              <p className="font-bold">
                Role: <span className="font-normal underline">{item.role}</span>
              </p>
            </div>
            <Link href={`users/${item.id}`}>
              <a
                className="bg-green-500 text-white text-lg font-bold border px-4 py-2 rounded hover:bg-green-300 focus:outline focus:outline-3 focus:outline-green-300  transition-all hover:scale-105"
                type="submit"
              >
                Account
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UsersList
