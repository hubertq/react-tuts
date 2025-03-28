import { Link } from 'react-router'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/slider'

const ExplorePage = () => {
	return (
		<div className='explore'>
			<header>
				<p className='pageHeader'>Explore</p>
			</header>
			<main>
				<Slider />

				<p className='exploreCategoryHeading'>Categories</p>
				<div className='exploreCategories'>
					<Link to={'/category/rent'}>
						<img
							src={rentCategoryImage}
							alt='rent'
							className='exploreCategoryImg'
						/>
						<p className='exploreCategoryName'>Places for rent</p>
					</Link>
					<Link to={'/category/sale'}>
						<img
							src={sellCategoryImage}
							alt='sell'
							className='exploreCategoryImg'
						/>
						<p className='exploreCategoryName'>Places for sale</p>
					</Link>
				</div>
			</main>
		</div>
	)
}
export default ExplorePage
