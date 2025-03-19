import { Navigate, Outlet } from 'react-router'
import useAuthStatus from '../hooks/useAuthStatus'
import Spinner from './spinner'

const ProtectedRoute = () => {
	const { loggedIn, isLoading } = useAuthStatus()

	if (isLoading) return <Spinner />

	return loggedIn ? <Outlet /> : <Navigate to={'/sign-in'} />
}
export default ProtectedRoute
