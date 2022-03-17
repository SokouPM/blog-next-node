import Link from "next/link"

const Nav = () => {
  return (
    <nav className="text-lg flex flex-row items-center justify-between">
      <Link href="signUp">
        <a>Sign-up</a>
      </Link>
      <Link href="/signIn">
        <a>Sign-in</a>
      </Link>
    </nav>
  )
}

export default Nav
