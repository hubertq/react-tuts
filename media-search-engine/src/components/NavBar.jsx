import { Container, Search } from './'
import { Link } from 'react-router-dom'

const NavBar = () => {
	return (
		<div className='navbar-wrapper'>
			<Container>
				<Link to='/'>
					<span className='nav-brand'>TMDB</span>
				</Link>
				<Search />
			</Container>
		</div>
	)
}
export default NavBar
