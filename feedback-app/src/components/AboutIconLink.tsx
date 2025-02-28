import { FaQuestion } from 'react-icons/fa'
import { NavLink } from 'react-router'

const AboutIconLink = () => {
	return (
		<NavLink
			to='/about'
			className={({ isActive }) =>
				isActive ? 'about-link hidden' : 'about-link'
			}
		>
			<FaQuestion size={20} />
		</NavLink>
	)
}
export default AboutIconLink
