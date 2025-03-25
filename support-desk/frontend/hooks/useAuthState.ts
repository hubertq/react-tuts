import { useEffect, useState } from "react"
import { useAppSelector } from "../src/app/hooks"
import { selectUser } from "../src/features/auth/authSlice"

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    setIsLoading(false)
  }, [user])

  return [loggedIn, isLoading]
}
