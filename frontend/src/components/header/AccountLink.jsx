import Link from "next/link"
import { useContext } from "react"
import { RiLogoutBoxFill } from "react-icons/ri"
import AppContext from "../AppContext"

const AccountLink = () => {
  const { session, signOut } = useContext(AppContext)
  const userId = JSON.parse(session).payload.user.userId
  const pseudo = JSON.parse(session).payload.user.pseudo

  return (
    <div className="flex items-center">
      <Link href={`/users/${encodeURIComponent(userId)}`}>
        <a className="mr-2 py-1 px-3 text-3xl font-bold text-white cursor-pointer transition-all hover:scale-105">
          <p>{pseudo}</p>
        </a>
      </Link>
      <button
        className="p-3 text-2xl text-white bg-black cursor-pointer rounded-full hover:bg-red-300 focus:outline focus:outline-3 focus:outline-red-300 transition-all hover:scale-105"
        onClick={signOut}
      >
        <RiLogoutBoxFill />
      </button>
    </div>
  )
}

export default AccountLink
