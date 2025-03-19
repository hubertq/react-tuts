import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
	collection,
	getDocs,
	query,
	orderBy,
	limit,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	A11y,
	Navigation,
	Pagination,
	Scrollbar,
} from 'swiper/modules'

import 'swiper/swiper-bundle.css'
import Spinner from './spinner'
import { ListingType } from '../types'

const Slider = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [listings, setListings] = useState<ListingType[]>([])

	const navigate = useNavigate()

	useEffect(() => {
		const fetchListings = async () => {
			const listingsRef = collection(db, 'listings')
			const q = query(
				listingsRef,
				orderBy('timestamp', 'desc'),
				limit(5)
			)
			const querySnap = await getDocs(q)

			let docs: ListingType[] = []

			querySnap.forEach(doc =>
				docs.push({
					id: doc.id,
					...doc.data(),
				} as ListingType)
			)

			setListings(docs)
			setIsLoading(false)
		}

		fetchListings()
	}, [])

	if (isLoading) return <Spinner />
	return (
		listings && (
			<>
				<p className='exploreHeading'>Recommended</p>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					slidesPerView={1}
					pagination={{ clickable: true }}
					style={{
						height: '200px',
					}}
				>
					{listings.map(listing => (
						<SwiperSlide
							key={listing.id}
							onClick={() =>
								navigate(`/category/${listing.type}/${listing.id}`)
							}
						>
							<div
								style={{
									background: `url(${listing.imageUrls[0]}) center no-repeat`,
									backgroundSize: 'cover',
								}}
								className='swiperSlideDiv'
							>
								<p className='swiperSlideText'>{listing.name}</p>
								<p className='swiperSlidePrice'>
									${listing.discountedPrice ?? listing.regularPrice}
									{listing.type === 'rent' && ' / month'}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	)
}
export default Slider
