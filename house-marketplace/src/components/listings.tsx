import { ListingType } from '../types'
import ListingItem from './listing-item'

type Props = {
	listings: ListingType[]
	category?: string
}

const Listings = ({ listings, category }: Props) => {
	if (listings.length === 0 && category)
		return <p>No listings for {category}</p>
	if (listings.length === 0 && !category)
		return <p>There are no current offers</p>

	return (
		<main>
			<ul className='categoryListings'>
				{listings.map(listing => (
					<ListingItem listing={listing} key={listing.id} />
				))}
			</ul>
		</main>
	)
}
export default Listings
