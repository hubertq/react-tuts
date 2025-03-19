import { Outlet } from 'react-router'
import NavBar from './components/nav-bar'

const Layout = () => {
	return (
		<>
			<Outlet />
			<NavBar />
		</>
	)
}
export default Layout
