import { Outlet } from 'react-router'
import Header from './components/Header'
import AboutIconLink from './components/AboutIconLink'

const Layout = () => {
	return (
		<>
			<Header />
			<div className='container'>
				<Outlet />
			</div>
			<AboutIconLink />
		</>
	)
}
export default Layout
