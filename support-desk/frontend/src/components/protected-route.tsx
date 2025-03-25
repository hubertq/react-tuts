import { Navigate, Outlet } from "react-router"

import Spinner from "./spinner"
import { useAuthStatus } from "../../hooks/useAuthState"

const ProtectedRoute = () => {
  const [loggedIn, isLoading] = useAuthStatus()

  if (isLoading) return <Spinner />

  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />
}
export default ProtectedRoute
