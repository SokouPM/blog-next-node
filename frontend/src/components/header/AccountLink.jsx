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
      <Link href={`/accounts/${userId}`}>
        <a>
          <p className="text-3xl font-bold mr-5">{pseudo}</p>
        </a>
      </Link>
      <RiLogoutBoxFill className="text-3xl cursor-pointer" onClick={signOut} />
    </div>
  )
}

export default AccountLink
