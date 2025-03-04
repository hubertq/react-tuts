import { FaGithub } from 'react-icons/fa'
import { Link, NavLink } from 'react-router'

type Props = {
	title?: string
}

const links = [
	{ title: 'Home', href: '/' },
	{ title: 'About', href: '/about' },
]
const Navbar = ({ title = 'Github Finder' }: Props) => {
	return (
		<nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='flex items-center'>
					<FaGithub className='inline pr-2 text-3xl' />
					<Link to='/' className='text-lg font-bold'>
						{title}
					</Link>
				</div>

				<div className='flex uppercase'>
					{links.map((link, i) => (
						<NavLink
							key={i}
							to={link.href}
							className={({ isActive }) =>
								isActive
									? 'btn btn-ghost btn-sm rounded-btn btn-active'
									: 'btn btn-ghost btn-sm rounded-btn'
							}
						>
							{link.title}
						</NavLink>
					))}
				</div>
			</div>
		</nav>
	)
}
export default Navbar
