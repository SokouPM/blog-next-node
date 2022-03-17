import "../styles/globals.css"

function App({ Component, pageProps, ...otherProps }) {
  return <Component {...pageProps} {...otherProps} />
}

export default App
