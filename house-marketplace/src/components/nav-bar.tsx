import OfferIcon from '../assets/svg/localOfferIcon.svg?react'
import ExploreIcon from '../assets/svg/exploreIcon.svg?react'
import PersonOutlineIcon from '../assets/svg/personOutlineIcon.svg?react'
import { useLocation, useNavigate } from 'react-router'

const NavBar = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const pathMatchRoute = (route: string) => {
		if (route === location.pathname) {
			return true
		}
	}

	const links = [
		{ title: 'Explore', href: '/', icon: ExploreIcon },
		{ title: 'Offers', href: '/offers', icon: OfferIcon },
		{ title: 'Profile', href: '/profile', icon: PersonOutlineIcon },
	]

	return (
		<footer className='navbar'>
			<nav className='navbarNav'>
				<ul className='navbarListItems'>
					{links.map((link, i) => {
						const LinkIcon = link.icon
						return (
							<li
								key={i}
								className='navbarListItem'
								onClick={() => navigate(link.href)}
							>
								<LinkIcon
									width={36}
									height={36}
									fill={pathMatchRoute(link.href) ? '#2c2c2c' : '#8f8f8f'}
								/>
								<p
									className={
										pathMatchRoute(link.href)
											? 'navbarListItemNameActive'
											: 'navbarListItemName'
									}
								>
									{link.title}
								</p>
							</li>
						)
					})}
				</ul>
			</nav>
		</footer>
	)
}
export default NavBar
