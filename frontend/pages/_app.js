import { AppContextProvider } from "../src/components/AppContext"
import "../styles/globals.css"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <AppContextProvider pageComponent={Component} router={otherProps.router}>
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider>
  )
}

export default App
