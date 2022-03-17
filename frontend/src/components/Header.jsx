import Link from "next/link"
import { useContext } from "react"
import AppContext from "../components/AppContext"
import Nav from "./Nav"
import AccountLink from "./header/AccountLink"

const Header = ({ pagename }) => {
  const { session } = useContext(AppContext)

  return (
    <header className="flex bg-slate-200 justify-between items-center mb-10 px-5 py-5">
      <Link href="/">
        <a>
          <h1 className="text-5xl font-bold">{pagename} | Blog project</h1>
        </a>
      </Link>
      {session ? <AccountLink /> : <Nav />}
    </header>
  )
}

export default Header
