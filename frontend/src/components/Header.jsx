import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import AppContext from "../components/AppContext"
import Nav from "./Nav"
import AccountLink from "./header/AccountLink"

const Header = () => {
  const { session } = useContext(AppContext)

  return (
    <header className="flex bg-pink-700 justify-between items-center mb-10 px-5 py-1">
      <Link href="/">
        <a className="flex items-center justify-center">
          <Image src="/logo.png" alt="logo ♥ ♥ ♥" width={200} height={70} />
        </a>
      </Link>
      {session ? <AccountLink /> : <Nav />}
    </header>
  )
}

export default Header
