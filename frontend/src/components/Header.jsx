import Nav from "./Nav"

const Header = ({ pagetitle }) => {
  return (
    <header>
      <h1 className="text-4xl font-bold">{pagetitle}</h1>
      <Nav />
    </header>
  )
}

export default Header
