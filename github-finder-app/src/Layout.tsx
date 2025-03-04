import { Outlet } from 'react-router'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const Layout = () => {
	return (
		<div className='flex flex-col justify-between h-screen'>
			<Navbar />
			<main className='container mx-auto px-3'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
export default Layout
