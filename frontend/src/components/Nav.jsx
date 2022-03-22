import Link from "next/link"

const Nav = () => {
  return (
    <nav className="text-white text-2xl font-bold flex items-center">
      <Link href="/signup">
        <a className="py-1 px-3 transition-all hover:scale-105">Sign Up</a>
      </Link>
      <Link href="/signin">
        <a className="py-1 px-3 transition-all hover:scale-105">Sign In</a>
      </Link>
    </nav>
  )
}

export default Nav
