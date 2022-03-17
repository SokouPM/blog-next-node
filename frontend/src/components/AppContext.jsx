import { createContext, useCallback, useEffect, useState } from "react"
import api from "./services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const { pageComponent: Page, router, ...otherProps } = props
  const [session, setSession] = useState()
  const initSession = useCallback((jwt) => {
    if (!jwt) {
      setSession(null)

      return
    }

    const [, payload] = jwt.split(".")
    const session = atob(payload)

    setSession(session)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")

    initSession(jwt)
  }, [initSession])

  useEffect(() => {
    if (session === null && Page.private) {
      router.push(`/login?redirect=${encodeURIComponent(location.pathname)}`) // TODO change
    }
  }, [Page.private, router, session])

  const signIn = useCallback(
    async (email, password) => {
      try {
        const {
          data: { jwt },
        } = await api.post("sessions/sign-in", { email, password }) // TODO change

        localStorage.setItem("jwt", jwt)
        initSession(jwt)

        const {
          query: { redirect },
        } = router

        if (redirect) {
          router.push(decodeURIComponent(redirect))
        }
      } catch (err) {
        alert(err.response.data.error)

        return { error: err.message }
      }
    },
    [initSession, router]
  )

  if (!session && Page.private) {
    return null
  }

  return <AppContext.Provider {...otherProps} value={{ session, signIn }} />
}

export default AppContext
