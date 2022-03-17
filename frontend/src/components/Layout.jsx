import Head from "next/head"
import Header from "./Header" // TODO create

const Layout = (props) => {
  const { children, ...otherProps } = props

  return (
    <div {...otherProps}>
      <Head>
        <title>{props.page} | Basic blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A basic blog in React/Node" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header page={props.page} />

      <div className="container-fluid d-flex px-0">
        <main className="container-fluid">{children}</main>
      </div>
    </div>
  )
}

export default Layout
