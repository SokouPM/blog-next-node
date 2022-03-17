import { createContext, useCallback, useEffect, useState } from "react"
import api from "./services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const { pageComponent: Page, router, ...otherProps } = props

  const [session, setSession] = useState()
  const [signInError, setSignInError] = useState(null)
  const [signUpError, setSignUpError] = useState(null)

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
      router.push(`/signin?redirect=${encodeURIComponent(location.pathname)}`)
    }
  }, [Page.private, router, session])

  useEffect(() => {
    if (session !== null && session !== undefined && Page.noSessionOnly) {
      router.push("/")
    }
  }, [Page.noSessionOnly, Page.private, router, session])

  const signIn = useCallback(
    async (email, password) => {
      try {
        const {
          data: { jwt },
        } = await api.post("sessions/sign-in", { email, password })
        setSignInError(null)
        localStorage.setItem("jwt", jwt)
        initSession(jwt)

        const {
          query: { redirect },
        } = router

        if (redirect) {
          router.push(decodeURIComponent(redirect))
        } else {
          router.push("/")
        }
      } catch (err) {
        setSignInError(err.response.data.error)
      }
    },
    [initSession, router]
  )

  const signUp = useCallback(
    async (displayName, email, password) => {
      try {
        await api.post("sessions/sign-up", { displayName, email, password })
        router.push("/signin")
        setSignUpError(null)
      } catch (err) {
        setSignUpError(err.response.data.error)
      }
    },
    [router]
  )

  const signOut = useCallback(() => {
    localStorage.clear()
    setSession(null)
    router.push("/signin")
  })

  if (!session && Page.private) {
    return null
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{ session, signInError, signUpError, signIn, signUp, signOut }}
    />
  )
}

export default AppContext
