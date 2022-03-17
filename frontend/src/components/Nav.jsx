import Link from "next/link"

const Nav = () => {
  return (
    <nav className="text-2xl font-bold">
      <Link href="/signup">
        <a className="px-3 py-2 hover:text-gray-400">Sign Up</a>
      </Link>
      <Link href="/signin">
        <a className="px-3 py-2 hover:text-gray-400">Sign In</a>
      </Link>
    </nav>
  )
}

export default Nav
