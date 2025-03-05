import { Outlet } from 'react-router'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Alert from './components/layout/Alert'

const Layout = () => {
	return (
		<div className='flex flex-col justify-between h-screen'>
			<Navbar />
			<main className='container mx-auto px-3'>
				<Alert />
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
export default Layout
