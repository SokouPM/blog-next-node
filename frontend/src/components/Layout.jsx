import Head from "next/head"
import Header from "./Header"

const Layout = (props) => {
  const { children, ...otherProps } = props

  return (
    <div {...otherProps}>
      <Head>
        <title>{props.pagename} | Blog project</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A blog in React/Node" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header pagename={props.pagename} />

      <main className="w-9/12 mx-auto">{children}</main>
    </div>
  )
}

export default Layout
